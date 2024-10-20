import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CursoDocenteService {

  constructor(public afs:AngularFirestore) { }

  public nombreDocente:string="";
  public seccionDocente:string="";
  public asignaturaDocente:string="";
  guardarDatosAsignatura(asignaturaId: string, seccionId: string, profesor: string) {
    this.nombreDocente = profesor;
    this.seccionDocente = seccionId;
    this.asignaturaDocente = asignaturaId;
  }

  // SECCIONES POR CADA ASIGNATURA (DEVUELVE EL ID Y SUS ATRIBUTOS)
  SeccionesPorAsignaturaProfesor(nomAsignatura:string,nomProfesor:String){
    return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
    .doc(nomAsignatura)
    .collection("Seccion", ref => ref.where('Profesor', '==', nomProfesor))
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
