import { __decorate } from "tslib";
import { Component } from '@angular/core';
let QrDocentePage = class QrDocentePage {
    constructor(navController, router, menuController, aa, hh, asignaturaService, afs, ds) {
        this.navController = navController;
        this.router = router;
        this.menuController = menuController;
        this.aa = aa;
        this.hh = hh;
        this.asignaturaService = asignaturaService;
        this.afs = afs;
        this.ds = ds;
        this.nombreUsuario = this.aa.nombreAlumno;
        this.nombreDocente = this.aa.nombreAlumno.toString();
        this.claseActualDocente = [];
        this.claseProcesoDocente = [];
    }
    ngOnInit() {
        this.claseEnProcesoDocente();
    }
    //Coleccion segun alumno
    claseEnProcesoDocente() {
        this.asignaturas = this.hh.TodasLasAsignaturas();
        this.asignaturas.subscribe(asignaturas => {
            // Aquí empieza la iteración sobre los valores
            for (const asignatura of asignaturas) {
                // Asegúrate de que asignatura.id existe
                this.secciones = this.hh.SeccionesPorAsignatura(asignatura.id);
                this.secciones.subscribe(secciones => {
                    // Aquí empieza la iteración sobre los valores
                    for (const seccion of secciones) {
                        if (seccion.Profesor === this.nombreUsuario) {
                            this.horario = this.hh.horarioAsignatura(asignatura.id, seccion.id);
                            this.horario.subscribe(horario => {
                                // Aquí empieza la iteración sobre los valores
                                for (const hora of horario) {
                                    this.claseProcesoDocente.push({
                                        asignaturaId: asignatura.id,
                                        seccionId: seccion.id,
                                        dia: hora.id,
                                        horaInicio: hora["Hora Inicio"],
                                        horaFin: hora["Hora Fin"]
                                    });
                                }
                                // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
                                this.claseEnProcesoMetodoDocente();
                            });
                        }
                    }
                });
            }
        });
    }
    claseEnProcesoMetodoDocente() {
        this.claseActualDocente = []; // Limpiar el array al inicio
        for (const item of this.claseProcesoDocente) {
            console.log((item.dia + item.horaInicio + item.horaFin));
            console.log(this.hh.verificarHorario(item.dia, item.horaInicio, item.horaFin));
            if (this.hh.verificarHorario(item.dia, item.horaInicio, item.horaFin)) {
                this.claseActualDocente.push(item);
                //DATOS A ENTREGAR EN EL QR
                this.hh.asignaturaNombre = item.asignaturaId;
                this.hh.seccionNombre = item.seccionId;
                this.hh.dia = item.dia;
                this.hh.horaInicio = item.horaInicio;
                this.hh.horaFin = item.horaFin;
            }
        }
    }
};
QrDocentePage = __decorate([
    Component({
        selector: 'app-qr-docente',
        templateUrl: './qr-docente.page.html',
        styleUrls: ['./qr-docente.page.scss'],
    })
], QrDocentePage);
export { QrDocentePage };
//# sourceMappingURL=qr-docente.page.js.map