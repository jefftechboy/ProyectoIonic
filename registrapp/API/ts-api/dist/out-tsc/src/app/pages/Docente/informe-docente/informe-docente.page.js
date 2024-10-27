import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { InformeModalComponent } from 'src/app/components/modulo/informe-modal/informe-modal.component'; // Ajusta la ruta según la estructura de tu proyecto
let InformeDocentePage = class InformeDocentePage {
    constructor(modalController) {
        this.modalController = modalController;
        // Usa la interfaz para definir el array de asignaturas
        this.asignaturas = [
            { nombre: 'Aplicacion Movil', seccion: '007D', horario: 'Lunes 08:00-10:00  y  Viernes: 08:30-09:50' },
            { nombre: 'Programacion Web', seccion: '011D', horario: 'Martes 08:30-09:50 y  Miercoles: 08:30-09:50 ' },
            { nombre: 'Fundamentos de Programacion', seccion: '015D', horario: 'Jueves 08:30:00-10:40 y Martes 10:00-12:00' },
            { nombre: 'Modelamiento Base de Datos', seccion: '008D', horario: 'Jueves 17:00-19:00 y Miercoles 14:30-16:40' },
            { nombre: 'Desarrollo Software', seccion: '012D', horario: 'Viernes 10:00-12:50 y Lunes 15:30-17:00 ' }
        ];
    }
    ngOnInit() { }
    // Especifica el tipo del parámetro asignatura
    async openModal(asignatura) {
        const modal = await this.modalController.create({
            component: InformeModalComponent,
            componentProps: {
                asignatura: asignatura
            }
        });
        return await modal.present();
    }
};
InformeDocentePage = __decorate([
    Component({
        selector: 'app-informe-docente',
        templateUrl: './informe-docente.page.html',
        styleUrls: ['./informe-docente.page.scss'],
    })
], InformeDocentePage);
export { InformeDocentePage };
//# sourceMappingURL=informe-docente.page.js.map