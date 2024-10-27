import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomePage = class HomePage {
    constructor(router, menuController, navController, aa, hh, asistenciaAlumnoService) {
        this.router = router;
        this.menuController = menuController;
        this.navController = navController;
        this.aa = aa;
        this.hh = hh;
        this.asistenciaAlumnoService = asistenciaAlumnoService;
        this.alertButtons = [
            {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Alert canceled');
                },
            },
            {
                text: 'Cerrar',
                role: 'confirm',
                handler: () => {
                    this.menuController.close('end');
                    this.navController.navigateForward("/login");
                },
            },
        ];
        this.nombreUsuario = this.aa.nombreAlumno;
        // Contiene todas las asignaturas del alumno
        this.vecesCombinadas = [];
        // Contiene la asignatura en proceso para ALUMNO
        this.claseEnProceso = [];
        // Contiene la asignatura en proceso para DOCENTE
        this.claseActualDocente = [];
        // Contiene todas las asignaturas del DOCENTE
        this.claseProcesoDocente = [];
    }
    navigateAndClose(path) {
        this.router.navigate([path]).then(() => {
            this.menuController.close('end'); // 'end' es el ID del menú, ajusta si es necesario
        });
    }
    ngOnInit() {
        this.claseEnProcesoAlumno();
        this.claseEnProcesoDocente();
    }
    //Metodo todas asignaturas de un alumno
    claseEnProcesoAlumno() {
        this.asignaturas = this.hh.TodasLasAsignaturas();
        this.asignaturas.subscribe(asignaturas => {
            // Aquí empieza la iteración sobre los valores
            for (const asignatura of asignaturas) {
                // Asegúrate de que asignatura.id existe
                this.secciones = this.hh.SeccionesPorAsignatura(asignatura.id);
                this.secciones.subscribe(secciones => {
                    // Aquí empieza la iteración sobre los valores
                    for (const seccion of secciones) {
                        // Asegúrate de que asignatura.id existe
                        this.alumnos = this.hh.alumnoPorSeccion(asignatura.id, seccion.id);
                        this.alumnos.subscribe(nombreAlumno => {
                            // Aquí empieza la iteración sobre los valores
                            for (const nombre of nombreAlumno) {
                                // Asegúrate de que asignatura.id existe
                                if (nombre.id === this.nombreUsuario) {
                                    this.horario = this.hh.horarioAsignatura(asignatura.id, seccion.id);
                                    this.horario.subscribe(horario => {
                                        // Aquí empieza la iteración sobre los valores
                                        for (const hora of horario) {
                                            this.vecesCombinadas.push({
                                                alumnoId: nombre.id,
                                                asignaturaId: asignatura.id,
                                                seccionId: seccion.id,
                                                dia: hora.id,
                                                horaInicio: hora["Hora Inicio"],
                                                horaFin: hora["Hora Fin"]
                                            });
                                        }
                                        // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
                                        this.claseEnProcesoMetodo();
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
    //Metodo todas asignaturas de un docente
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
    // metodo que verifica el horario de asignatura y el sistema para los ALUMNOS 
    claseEnProcesoMetodo() {
        this.claseEnProceso = [];
        for (const item of this.vecesCombinadas) {
            if (this.hh.verificarHorario(item.dia, item.horaInicio, item.horaFin)) {
                this.claseEnProceso.push(item);
                this.asistenciaAlumnoService.claseActualAlumno.push(item);
            }
        }
    }
    // metodo que verifica el horario de asignatura y el sistema para los DOCENTE 
    claseEnProcesoMetodoDocente() {
        this.claseActualDocente = [];
        for (const item of this.claseProcesoDocente) {
            if (this.hh.verificarHorario(item.dia, item.horaInicio, item.horaFin)) {
                this.claseActualDocente.push(item);
            }
        }
    }
};
HomePage = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: 'home.page.html',
        styleUrls: ['home.page.scss'],
    })
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map