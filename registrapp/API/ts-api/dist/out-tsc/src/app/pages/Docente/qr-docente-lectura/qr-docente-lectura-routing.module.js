import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QrDocenteLecturaPage } from './qr-docente-lectura.page';
const routes = [
    {
        path: '',
        component: QrDocenteLecturaPage
    }
];
let QrDocenteLecturaPageRoutingModule = class QrDocenteLecturaPageRoutingModule {
};
QrDocenteLecturaPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], QrDocenteLecturaPageRoutingModule);
export { QrDocenteLecturaPageRoutingModule };
//# sourceMappingURL=qr-docente-lectura-routing.module.js.map