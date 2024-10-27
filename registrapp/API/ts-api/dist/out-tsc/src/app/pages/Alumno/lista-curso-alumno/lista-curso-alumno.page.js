import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ListaCursoAlumnoPage = class ListaCursoAlumnoPage {
    constructor(aa, lg) {
        this.aa = aa;
        this.lg = lg;
        // LISTA ASIGNATURA
        this.TodaAsignatura = [];
        // SECCIONES ALMACENADAS POR ID DE ASIGNATURAS
        this.SeccionesPorAsignatura = {};
        // Objeto que almacenará los alumnos por sección, usando el ID de la asignatura y el código de la sección
        this.AlumnosPorSeccion = {};
        // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
        this.AsistenciaPorAlumno = {};
        // Variables para el modal y la asistencia seleccionada
        this.isModalOpen = false;
        this.selectedAlumno = '';
        this.asistenciaDetalle = [];
    }
    ngOnInit() {
        this.AsignaturasGenerales();
    }
    // En tu componente .ts
    getAsistenciaPorcentaje() {
        const total = this.asistenciaDetalle.filter(estado => estado.Estado === 'Presente' || estado.Estado === 'Ausente').length;
        const presentes = this.asistenciaDetalle.filter(estado => estado.Estado === 'Presente').length;
        return total > 0 ? (presentes / total) * 100 : 0; // Evitar división por cero
    }
    // Calcula todas
    AsignaturasGenerales() {
        this.aa.TodasLasAsignaturas().subscribe(data => {
            this.TodaAsignatura = data;
            // Buscar secciones según ID de asignatura
            this.TodaAsignatura.forEach(curso => {
                this.aa.SeccionesPorAsignatura(curso.id).subscribe(secciones => {
                    this.SeccionesPorAsignatura[curso.id] = secciones;
                    secciones.forEach(seccion => {
                        this.aa.alumnoPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
                            if (!this.AlumnosPorSeccion[curso.id]) {
                                this.AlumnosPorSeccion[curso.id] = {};
                            }
                            // Filtrar alumnos por nombre "Roberto Huaitro"
                            const alumnosFiltrados = alumnos.filter(alumno => alumno.id === this.lg.nombreAlumno);
                            this.AlumnosPorSeccion[curso.id][seccion.id] = alumnosFiltrados;
                            // Crear una estructura para almacenar asistencia por alumno
                            if (!this.AsistenciaPorAlumno[curso.id]) {
                                this.AsistenciaPorAlumno[curso.id] = {};
                            }
                            if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
                                this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
                            }
                            // Iterar solo sobre los alumnos filtrados para obtener su asistencia
                            alumnosFiltrados.forEach(alumno => {
                                this.aa.EstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
                                    // Almacenar asistencia por asignatura, sección y alumno
                                    this.AsistenciaPorAlumno[curso.id][seccion.id][alumno.id] = asistencia;
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    openModal(cursoId, seccionId, alumnoId) {
        this.selectedAlumno = alumnoId;
        // Aquí se obtiene el detalle de la asistencia del alumno
        this.asistenciaDetalle = this.AsistenciaPorAlumno[cursoId][seccionId][alumnoId];
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
};
ListaCursoAlumnoPage = __decorate([
    Component({
        selector: 'app-lista-curso-alumno',
        templateUrl: './lista-curso-alumno.page.html',
        styleUrls: ['./lista-curso-alumno.page.scss'],
    })
], ListaCursoAlumnoPage);
export { ListaCursoAlumnoPage };
//# sourceMappingURL=lista-curso-alumno.page.js.map