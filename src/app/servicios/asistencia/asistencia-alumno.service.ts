import { Injectable } from '@angular/core';


import { Persona } from 'src/app/model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable,combineLatest } from 'rxjs';
//Importaciones
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaAlumnoService {

  constructor(private afs:AngularFirestore) { }


  

  // LISTA DE TODAS LAS ASIGNATURAS  (DEVUELVE EL ID Y SUS ATRIBUTOS)
  TodasLasAsignaturas(){
    return this.afs.collection('Asignatura')
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
            const data = a.payload.doc.data() as any;  // Obtener los datos del documento
            const id = a.payload.doc.id;  // Obtener el ID del documento
            return { id, ...data };  // Retornar un objeto con los datos y el ID
          })
        )
      );  
  }

  // Detalle Asistencia
  EstadoAsistenciaAlumno(nomAsignatura:string,codSeccion:string,nomAlumno:string){
    return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
    .doc(nomAsignatura)
    .collection("Seccion")
    .doc(codSeccion)
    .collection("Alumno")
    .doc(nomAlumno)
    .collection("Asistencia")
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
  
  
  
  
  














  

 

}
