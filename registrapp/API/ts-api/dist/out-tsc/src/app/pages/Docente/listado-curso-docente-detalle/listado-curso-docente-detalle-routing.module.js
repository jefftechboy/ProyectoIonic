import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListadoCursoDocenteDetallePage } from './listado-curso-docente-detalle.page';
const routes = [
    {
        path: '',
        component: ListadoCursoDocenteDetallePage
    }
];
let ListadoCursoDocenteDetallePageRoutingModule = class ListadoCursoDocenteDetallePageRoutingModule {
};
ListadoCursoDocenteDetallePageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ListadoCursoDocenteDetallePageRoutingModule);
export { ListadoCursoDocenteDetallePageRoutingModule };
//# sourceMappingURL=listado-curso-docente-detalle-routing.module.js.map