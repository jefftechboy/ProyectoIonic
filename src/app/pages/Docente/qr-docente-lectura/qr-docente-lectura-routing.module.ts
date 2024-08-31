import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrDocenteLecturaPage } from './qr-docente-lectura.page';

const routes: Routes = [
  {
    path: '',
    component: QrDocenteLecturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrDocenteLecturaPageRoutingModule {}
