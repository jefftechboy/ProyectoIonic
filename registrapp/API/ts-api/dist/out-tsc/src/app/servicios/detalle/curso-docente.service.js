import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
let CursoDocenteService = class CursoDocenteService {
    constructor(afs) {
        this.afs = afs;
        this.nombreDocente = "";
        this.seccionDocente = "";
        this.asignaturaDocente = "";
    }
    guardarDatosAsignatura(asignaturaId, seccionId, profesor) {
        this.nombreDocente = profesor;
        this.seccionDocente = seccionId;
        this.asignaturaDocente = asignaturaId;
    }
    // SECCIONES POR CADA ASIGNATURA (DEVUELVE EL ID Y SUS ATRIBUTOS)
    SeccionesPorAsignaturaProfesor(nomAsignatura, nomProfesor) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion", ref => ref.where('Profesor', '==', nomProfesor))
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
};
CursoDocenteService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CursoDocenteService);
export { CursoDocenteService };
//# sourceMappingURL=curso-docente.service.js.map