import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoCursoDocenteDetallePage } from './listado-curso-docente-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoCursoDocenteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoCursoDocenteDetallePageRoutingModule {}
