import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrDocentePage } from './qr-docente.page';

const routes: Routes = [
  {
    path: '',
    component: QrDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrDocentePageRoutingModule {}
