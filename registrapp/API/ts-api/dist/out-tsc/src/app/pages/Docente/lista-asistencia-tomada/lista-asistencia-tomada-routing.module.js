import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaAsistenciaTomadaPage } from './lista-asistencia-tomada.page';
const routes = [
    {
        path: '',
        component: ListaAsistenciaTomadaPage
    }
];
let ListaAsistenciaTomadaPageRoutingModule = class ListaAsistenciaTomadaPageRoutingModule {
};
ListaAsistenciaTomadaPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ListaAsistenciaTomadaPageRoutingModule);
export { ListaAsistenciaTomadaPageRoutingModule };
//# sourceMappingURL=lista-asistencia-tomada-routing.module.js.map