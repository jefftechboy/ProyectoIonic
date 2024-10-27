import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ListadoCursoDocenteDetallePage = class ListadoCursoDocenteDetallePage {
    constructor(dc, hh, modalController) {
        this.dc = dc;
        this.hh = hh;
        this.modalController = modalController;
        this.AlumnosPorSeccion = [];
        // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
        this.asistenciaDetalle = {};
        this.isModalOpen = false;
    }
    ngOnInit() {
        console.log(this.dc.asignaturaDocente);
        console.log(this.dc.nombreDocente);
        console.log(this.dc.seccionDocente);
        this.detalleCursoDocente();
    }
    detalleCursoDocente() {
        this.hh.alumnoPorSeccion(this.dc.asignaturaDocente, this.dc.seccionDocente).subscribe(data => {
            this.AlumnosPorSeccion = data;
            data.forEach(alumno => {
                this.hh.EstadoAsistenciaAlumno(this.dc.asignaturaDocente, this.dc.seccionDocente, alumno.id).subscribe(data => {
                    for (const hora of data) {
                        this.hh.EstadoAsistenciaAlumno(this.dc.asignaturaDocente, this.dc.seccionDocente, alumno.id).subscribe(detalle => {
                            this.asistenciaDetalle[alumno.id] = detalle;
                        });
                    }
                });
            });
        });
    }
    // Método para calcular el porcentaje de presencias
    calcularPorcentajePresencias(id) {
        const detalles = this.asistenciaDetalle[id];
        if (!detalles || detalles.length === 0) {
            return '0%'; // No hay asistencia registrada
        }
        const total = detalles.filter(d => d.Estado === 'Presente' || d.Estado === 'Ausente').length;
        const presentes = detalles.filter(d => d.Estado === 'Presente').length;
        const porcentaje = (presentes / total) * 100;
        return `${porcentaje.toFixed(2)}%`; // Retorna el porcentaje con 2 decimales
    }
    openModal(id) {
        this.selectedId = id;
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
};
ListadoCursoDocenteDetallePage = __decorate([
    Component({
        selector: 'app-listado-curso-docente-detalle',
        templateUrl: './listado-curso-docente-detalle.page.html',
        styleUrls: ['./listado-curso-docente-detalle.page.scss'],
    })
], ListadoCursoDocenteDetallePage);
export { ListadoCursoDocenteDetallePage };
//# sourceMappingURL=listado-curso-docente-detalle.page.js.map