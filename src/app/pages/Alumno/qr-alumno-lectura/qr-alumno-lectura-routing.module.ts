import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrAlumnoLecturaPage } from './qr-alumno-lectura.page';

const routes: Routes = [
  {
    path: '',
    component: QrAlumnoLecturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrAlumnoLecturaPageRoutingModule {}
