import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ListadoCursoDocentePage = class ListadoCursoDocentePage {
    constructor(lg, hh, vp, cd) {
        this.lg = lg;
        this.hh = hh;
        this.vp = vp;
        this.cd = cd;
        /*------------------------------- LISTAS DE ALMACENAMIENTO DE INFORMACION ----------------------- */
        // LISTA ASIGNATURAS
        this.TodaAsignatura = [];
        // SECCIONES ALMACENADAS POR ASIGNATURA
        this.SeccionesPorAsignatura = {};
        // ALMACENA NOMBRE DEL USUARIO SE ASOCIA AL NOMBRE DEL PROFESOR
        this.nombreProfesor = this.lg.nombreAlumno;
    }
    ngOnInit() {
        this.AsignaturasGeneralesDocente();
    }
    /*-------------------------------FUNCION QUE GUARDA DATOS PARA DETALLE ----------------------- */
    guardarDatosAsignatura(asignaturaId, seccionId, profesor) {
        this.cd.guardarDatosAsignatura(asignaturaId, seccionId, profesor);
        this.vp.navigateForward("/listCurDocDetalle");
        console.log("Guardado exitosamente");
    }
    /*-------------------FUNCION QUE RECOPILA ASIGNATURAS / SECCIONES SEGUN EL PROFESOR ---------- */
    // TODAS LAS ASIGNATURAS
    AsignaturasGeneralesDocente() {
        this.hh.TodasLasAsignaturas().subscribe(data => {
            this.TodaAsignatura = data;
            // SECCIONES SEGUN ASIGNATURA
            this.TodaAsignatura.forEach(curso => {
                this.cd.SeccionesPorAsignaturaProfesor(curso.id, this.nombreProfesor).subscribe(secciones => {
                    //FILTRO POR NOMBRE DEL DOCENTE
                    secciones.forEach(sec => {
                        console.log(this.nombreProfesor);
                        console.log(sec.Profesor);
                        console.log(sec.Profesor === this.nombreProfesor);
                        if ((sec.Profesor === this.nombreProfesor) == true) {
                            this.SeccionesPorAsignatura[curso.id] = secciones;
                            console.log("SI ingreso");
                        }
                        else {
                            console.log("NO ingreso");
                        }
                    });
                });
            });
        });
    }
};
ListadoCursoDocentePage = __decorate([
    Component({
        selector: 'app-listado-curso-docente',
        templateUrl: './listado-curso-docente.page.html',
        styleUrls: ['./listado-curso-docente.page.scss'],
    })
], ListadoCursoDocentePage);
export { ListadoCursoDocentePage };
//# sourceMappingURL=listado-curso-docente.page.js.map