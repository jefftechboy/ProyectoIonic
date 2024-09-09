import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrAlumnoLecturaPageRoutingModule } from './qr-alumno-lectura-routing.module';

import { QrAlumnoLecturaPage } from './qr-alumno-lectura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrAlumnoLecturaPageRoutingModule
  ],
  declarations: [QrAlumnoLecturaPage]
})
export class QrAlumnoLecturaPageModule {}
