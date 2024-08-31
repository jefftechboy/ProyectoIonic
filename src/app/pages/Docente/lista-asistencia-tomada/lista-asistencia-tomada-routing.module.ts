import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAsistenciaTomadaPage } from './lista-asistencia-tomada.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAsistenciaTomadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAsistenciaTomadaPageRoutingModule {}
