import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InformeDocentePage } from './informe-docente.page';
const routes = [
    {
        path: '',
        component: InformeDocentePage
    }
];
let InformeDocentePageRoutingModule = class InformeDocentePageRoutingModule {
};
InformeDocentePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], InformeDocentePageRoutingModule);
export { InformeDocentePageRoutingModule };
//# sourceMappingURL=informe-docente-routing.module.js.map