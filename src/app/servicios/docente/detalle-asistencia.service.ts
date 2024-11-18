import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetalleAsistenciaService {

  constructor(private afs: AngularFirestore) { }

  // ALUMNOS FILTRADOS POR SECCION
  alumnoPorSeccion(nomAsignatura: string, codSeccion: string): Observable<any[]> {
    // Verificar que los parámetros no estén vacíos
    if (!nomAsignatura || !codSeccion) {
      throw new Error('Asignatura o Sección no pueden estar vacíos');
    }
  
    return this.afs.collection('Asignatura')
      .doc(nomAsignatura)
      .collection("Seccion")
      .doc(codSeccion)
      .collection("Alumno")
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data };
          })
        )
      );
  }
  

  // Detalle Asistencia
  EstadoAsistenciaAlumno(nomAsignatura: string, codSeccion: string, nomAlumno: string): Observable<any[]> {
    return this.afs.collection('Asignatura')
      .doc(nomAsignatura)
      .collection("Seccion")
      .doc(codSeccion)
      .collection("Alumno")
      .doc(nomAlumno)
      .collection("Asistencia")
      .valueChanges();
  }

  // ALUMNOS FILTRADOS POR SECCION CON ASISTENCIA
  alumnoConAsistencia(nomAsignatura: string, codSeccion: string): Observable<any[]> {
    return this.afs.collection('Asignatura')
      .doc(nomAsignatura)
      .collection("Seccion")
      .doc(codSeccion)
      .collection("Alumno")
      .snapshotChanges() // Obtiene los metadatos y datos de la colección
      .pipe(
        switchMap(actions => {
          const alumnos = actions.map(a => {
            const id = a.payload.doc.id;  // Obtener el ID del documento
            const data = a.payload.doc.data() as any;  // Obtener los datos del documento
            return { id, ...data };  // Retornar un objeto con los datos y el ID
          });

          // Genera un array de observables para obtener la asistencia de cada alumno
          const asistenciaObservables = alumnos.map(alumno =>
            this.EstadoAsistenciaAlumno(nomAsignatura, codSeccion, alumno.id)
              .pipe(map(asistencia => ({ ...alumno, asistencia })))  // Fusiona el alumno con su asistencia
          );

          // Ejecuta todos los observables de asistencia en paralelo
          return forkJoin(asistenciaObservables);
        })
      );
  }
}
