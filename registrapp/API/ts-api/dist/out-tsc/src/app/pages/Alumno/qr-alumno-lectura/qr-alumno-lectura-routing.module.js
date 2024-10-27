import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QrAlumnoLecturaPage } from './qr-alumno-lectura.page';
const routes = [
    {
        path: '',
        component: QrAlumnoLecturaPage
    }
];
let QrAlumnoLecturaPageRoutingModule = class QrAlumnoLecturaPageRoutingModule {
};
QrAlumnoLecturaPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], QrAlumnoLecturaPageRoutingModule);
export { QrAlumnoLecturaPageRoutingModule };
//# sourceMappingURL=qr-alumno-lectura-routing.module.js.map