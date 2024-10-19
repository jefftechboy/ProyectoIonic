import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from 'firebase/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClaseActualService {

  constructor(public afs:AngularFirestore) { }

  
  // LISTA DE TODAS LAS ASIGNATURAS  (DEVUELVE EL ID Y SUS ATRIBUTOS)
  TodasLasAsignaturas(){
    return this.afs.collection('Asignatura')
      .snapshotChanges()  // Obtiene los metadatos y datos de la colección
      .pipe(
        map(actions => 
          actions.map(a => {
            const id = a.payload.doc.id;  // Obtener el ID del documento
            return { id };  // Retornar un objeto con los datos y el ID
          })
        )
      );
  }
  // SECCIONES POR CADA ASIGNATURA (DEVUELVE EL ID Y SUS ATRIBUTOS)
  SeccionesPorAsignatura(nomAsignatura:string){
    return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
    .doc(nomAsignatura)
    .collection("Seccion")
    .snapshotChanges()  // Obtiene los metadatos y datos de la colección
      .pipe(
        map(actions => 
          actions.map(a => {
            const data = a.payload.doc.data() as any;  // Obtener los datos del documento
            const id = a.payload.doc.id;  // Obtener el ID del documento
            return { id, ...data };  // Retornar un objeto con los datos y el ID
          })
        )
      );  
  }
  // ALUMNOS FILTRADOS POR SECCION
  alumnoPorSeccion(nomAsignatura:string,codSeccion:string){
    return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
    .doc(nomAsignatura)
    .collection("Seccion")
    .doc(codSeccion)
    .collection("Alumno")
    .snapshotChanges()  // Obtiene los metadatos y datos de la colección
      .pipe(
        map(actions => 
          actions.map(a => {
            const id = a.payload.doc.id;  // Obtener el ID del documento
            return { id };  // Retornar un objeto con los datos y el ID
          })
        )
      );  
  }
  

  horarioAsignatura(asignaturaNom:string,seccion:string){
   return this.afs.collection("Asignatura")
            .doc(asignaturaNom)
            .collection("Seccion")
            .doc(seccion)
            .collection("Horario")
            .snapshotChanges()  // Obtiene los metadatos y datos de la colección
            .pipe(
              map(actions => 
                actions.map(a => {
                  const data = a.payload.doc.data() as any;  // Obtener los datos del documento
                  const id = a.payload.doc.id;  // Obtener el ID del documento
                  return { id, ...data };  // Retornar un objeto con los datos y el ID
                })
              )
            );  
  }
  

  
  verificarHorario(dia: string, horaInicio: string, horaFin: string): boolean {
    // Dia De la semana
    const diasValidos = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    // Obtener el día actual
    const diaActual = diasValidos[new Date().getDay()].toLowerCase();
    // Obtener la hora actual en formato "HH:MM"
    const horaActual = new Date().toTimeString().slice(0, 5);
    // Verificar si es el mismo día y si la hora está en el rango
    return  (dia.toLowerCase() === diaActual ) &&  ( horaActual >= horaInicio ) && ( horaActual <= horaFin ) ;
  }
  
  


}



