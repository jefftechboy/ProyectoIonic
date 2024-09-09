import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeDocentePage } from './informe-docente.page';

const routes: Routes = [
  {
    path: '',
    component: InformeDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeDocentePageRoutingModule {}
