import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let ClaseActualService = class ClaseActualService {
    constructor(afs) {
        this.afs = afs;
        this.asignaturaNombre = '';
        this.seccionNombre = '';
        this.dia = '';
        this.horaInicio = '';
        this.horaFin = '';
    }
    // LISTA DE TODAS LAS ASIGNATURAS  (DEVUELVE EL ID Y SUS ATRIBUTOS)
    TodasLasAsignaturas() {
        return this.afs.collection('Asignatura')
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id }; // Retornar un objeto con los datos y el ID
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
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id }; // Retornar un objeto con los datos y el ID
        })));
    }
    horarioAsignatura(asignaturaNom, seccion) {
        return this.afs.collection("Asignatura")
            .doc(asignaturaNom)
            .collection("Seccion")
            .doc(seccion)
            .collection("Horario")
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    asistenciaAlumno(asignaturaNom, seccion, nombreAlumno) {
        return this.afs.collection("Asignatura")
            .doc(asignaturaNom)
            .collection("Seccion")
            .doc(seccion)
            .collection("Alumno")
            .doc(nombreAlumno)
            .collection("Asistencia")
            .snapshotChanges() // Obtiene los metadatos y datos de la colección
            .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data(); // Obtener los datos del documento
            const id = a.payload.doc.id; // Obtener el ID del documento
            return { id, ...data }; // Retornar un objeto con los datos y el ID
        })));
    }
    verificarHorario(dia, horaInicio, horaFin) {
        // Dia De la semana
        const diasValidos = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        // Obtener el día actual
        const diaActual = diasValidos[new Date().getDay()].toLowerCase();
        // Obtener la hora actual en formato "HH:MM"
        const horaActual = new Date().toTimeString().slice(0, 5);
        // Verificar si es el mismo día y si la hora está en el rango
        return (dia.toLowerCase() === diaActual) && (horaActual >= horaInicio) && (horaActual <= horaFin);
    }
};
ClaseActualService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClaseActualService);
export { ClaseActualService };
//# sourceMappingURL=clase-actual.service.js.map