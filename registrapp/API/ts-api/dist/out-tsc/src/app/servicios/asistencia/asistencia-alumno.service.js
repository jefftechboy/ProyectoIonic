import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let AsistenciaAlumnoService = class AsistenciaAlumnoService {
    constructor(afs) {
        this.afs = afs;
        this.claseActualAlumno = [];
        //informacion para toma de asistencia
        this.fecha = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        this.asignatura = '';
        this.seccion = '';
        this.alumno = '';
    }
    // LISTA DE TODAS LAS ASIGNATURAS  (DEVUELVE EL ID Y SUS ATRIBUTOS)
    TodasLasAsignaturas() {
        return this.afs.collection('Asignatura')
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    // SECCIONES POR CADA ASIGNATURA (DEVUELVE EL ID Y SUS ATRIBUTOS)
    SeccionesPorAsignatura(nomAsignatura) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion")
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
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
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
        ;
    }
    // ESTO DEVOLVERA LOS DOCUMENTOS DE ASISTENCIAS (LOS DOCUMENTOS SE LLAMAN POR LA FECHA DE LA ASISTENCIA)
    buscarAsistenciaRegistrar(nomAsignatura, codSeccion, nomAlumno) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion")
            .doc(codSeccion)
            .collection("Alumno")
            .doc(nomAlumno)
            .collection("Asistencia")
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        })));
    }
    // ESTO DEVOLVERA LOS DOCUMENTOS DE ASISTENCIAS (LOS DOCUMENTOS SE LLAMAN POR LA FECHA DE LA ASISTENCIA)
    registrarAsentenciaPresente(nomAsignatura, codSeccion, nomAlumno, numeroClase) {
        const docRef = this.afs.collection('Asignatura')
            .doc(nomAsignatura)
            .collection("Seccion")
            .doc(codSeccion)
            .collection("Alumno")
            .doc(nomAlumno)
            .collection("Asistencia")
            .doc(numeroClase);
        // Actualizar el campo Estado a "Presente"
        return docRef.update({ Estado: "Presente" });
    }
    eliminarAsentenciaPresente(nomAsignatura, codSeccion, nomAlumno, numeroClase) {
        const docRef = this.afs.collection('Asignatura')
            .doc(nomAsignatura)
            .collection("Seccion")
            .doc(codSeccion)
            .collection("Alumno")
            .doc(nomAlumno)
            .collection("Asistencia")
            .doc(numeroClase);
        // Actualizar el campo Estado a "Ausente"
        return docRef.update({ Estado: "Ausente" });
    }
    // LISTA DE TODAS LAS ASIGNATURAS  (DEVUELVE EL ID Y SUS ATRIBUTOS)
    TodasLasAsignaturasDocente() {
        return this.afs.collection('Asignatura')
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    // SECCIONES POR CADA ASIGNATURA (DEVUELVE EL ID Y SUS ATRIBUTOS)
    SeccionesPorAsignaturaDocente(nomAsignatura) {
        return this.afs.collection('Asignatura') // Selecciona todas las asignaturas
            .doc(nomAsignatura)
            .collection("Seccion")
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    // ALUMNOS FILTRADOS POR SECCION
    alumnoPorSeccionDocente(nomAsignatura, codSeccion) {
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
    EstadoAsistenciaAlumnoDocente(nomAsignatura, codSeccion, nomAlumno) {
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
AsistenciaAlumnoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AsistenciaAlumnoService);
export { AsistenciaAlumnoService };
//# sourceMappingURL=asistencia-alumno.service.js.map