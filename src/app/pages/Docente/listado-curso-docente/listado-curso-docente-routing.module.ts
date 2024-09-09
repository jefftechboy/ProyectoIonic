import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoCursoDocentePage } from './listado-curso-docente.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoCursoDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoCursoDocentePageRoutingModule {}
