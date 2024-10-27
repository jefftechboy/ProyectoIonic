import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QrAlumnoPage } from './qr-alumno.page';
const routes = [
    {
        path: '',
        component: QrAlumnoPage
    }
];
let QrAlumnoPageRoutingModule = class QrAlumnoPageRoutingModule {
};
QrAlumnoPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], QrAlumnoPageRoutingModule);
export { QrAlumnoPageRoutingModule };
//# sourceMappingURL=qr-alumno-routing.module.js.map