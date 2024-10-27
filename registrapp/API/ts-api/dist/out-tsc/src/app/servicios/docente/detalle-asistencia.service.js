import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let DetalleAsistenciaService = class DetalleAsistenciaService {
    constructor(afs) {
        this.afs = afs;
    }
    // ALUMNOS FILTRADOS POR SECCION
    alumnoPorSeccion(nomAsignatura, codSeccion) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion")
            .doc(codSeccion)
            .collection("Alumno")
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    // Detalle Asistencia
    EstadoAsistenciaAlumno(nomAsignatura, codSeccion, nomAlumno) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion")
            .doc(codSeccion)
            .collection("Alumno")
            .doc(nomAlumno)
            .collection("Asistencia")
            .valueChanges();
    }
};
DetalleAsistenciaService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DetalleAsistenciaService);
export { DetalleAsistenciaService };
//# sourceMappingURL=detalle-asistencia.service.js.map