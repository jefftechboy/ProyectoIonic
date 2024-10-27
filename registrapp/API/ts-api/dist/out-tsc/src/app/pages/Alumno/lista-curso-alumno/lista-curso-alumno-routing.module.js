import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaCursoAlumnoPage } from './lista-curso-alumno.page';
const routes = [
    {
        path: '',
        component: ListaCursoAlumnoPage
    }
];
let ListaCursoAlumnoPageRoutingModule = class ListaCursoAlumnoPageRoutingModule {
};
ListaCursoAlumnoPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ListaCursoAlumnoPageRoutingModule);
export { ListaCursoAlumnoPageRoutingModule };
//# sourceMappingURL=lista-curso-alumno-routing.module.js.map