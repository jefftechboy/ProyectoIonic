import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListadoCursoDocentePage } from './listado-curso-docente.page';
const routes = [
    {
        path: '',
        component: ListadoCursoDocentePage
    }
];
let ListadoCursoDocentePageRoutingModule = class ListadoCursoDocentePageRoutingModule {
};
ListadoCursoDocentePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ListadoCursoDocentePageRoutingModule);
export { ListadoCursoDocentePageRoutingModule };
//# sourceMappingURL=listado-curso-docente-routing.module.js.map