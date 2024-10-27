import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QrDocentePage } from './qr-docente.page';
const routes = [
    {
        path: '',
        component: QrDocentePage
    }
];
let QrDocentePageRoutingModule = class QrDocentePageRoutingModule {
};
QrDocentePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], QrDocentePageRoutingModule);
export { QrDocentePageRoutingModule };
//# sourceMappingURL=qr-docente-routing.module.js.map