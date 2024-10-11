import { Injectable } from '@angular/core';

import { Persona } from '../model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
//Importaciones
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CrudpersonaService {

  constructor( private afs:AngularFirestore) { }


grabar(persona:Persona){
  return this.afs.collection('persona').add(persona);
}

listarTodo(): Observable<Persona[]>{
  return this.afs.collection<Persona>('persona').valueChanges({idField:'id'})
}

eliminar(id:any){
  return this.afs.collection('persona').doc(id).delete();
}

modificar(persona:Persona){
  return this.afs.collection('persona').doc(persona.id).update(persona)
}





buscarAsignaturasPorNombre2(nombreAsignatura: string): Observable<any[]> {
  return this.afs.collection('Asignatura', ref => ref.where('Nombre', '==', nombreAsignatura))
    .snapshotChanges() // Usamos snapshotChanges para obtener detalles del documento, incluido el ID
    .pipe(
      switchMap(asignaturas => {
        if (asignaturas.length > 0) {
          // Obtenemos el ID del documento de la primera asignatura encontrada
          const asignaturaId = asignaturas[0].payload.doc.id;
          
          // Accedemos a la subcolección 'Horario' dentro del documento de la asignatura filtrada
          return this.afs.collection(`Asignatura/${asignaturaId}/Horario`).valueChanges();
        } else {
          // Si no se encuentra ninguna asignatura, devolvemos un observable vacío
          return of([]);
        }
      })
    );
}

buscarAsignaturasPorNombre(nombreAsignatura: string): Observable<any[]> {
  return this.afs.collection('Asignatura', ref => ref.where('Nombre', '==', nombreAsignatura))
    .snapshotChanges() // Usamos snapshotChanges para obtener tanto los datos como el ID
    .pipe(
      switchMap(asignaturas => {
        if (asignaturas.length > 0) {
          const asignaturaId = asignaturas[0].payload.doc.id;
          
          // Accedemos a la subcolección 'Horario'
          return this.afs.collection(`Asignatura/${asignaturaId}/Horario`)
            .snapshotChanges() // Usamos snapshotChanges para obtener el ID de los documentos de 'Horario'
            .pipe(
              map(horarios => horarios.map(horario => {
                const data = horario.payload.doc.data(); // Obtenemos los datos de 'Horario'
                const id = horario.payload.doc.id; // Obtenemos el ID del documento de 'Horario'
                return { id,data }; // Retornamos un objeto con el ID y los datos
              }))
            );
        } else {
          return of([]); // Retornamos un observable vacío si no hay asignaturas
        }
      })
    );
}

}

