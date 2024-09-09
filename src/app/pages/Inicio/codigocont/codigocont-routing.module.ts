import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigocontPage } from './codigocont.page';

const routes: Routes = [
  {
    path: '',
    component: CodigocontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigocontPageRoutingModule {}
