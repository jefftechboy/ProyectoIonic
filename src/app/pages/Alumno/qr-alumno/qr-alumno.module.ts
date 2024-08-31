import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrAlumnoPageRoutingModule } from './qr-alumno-routing.module';

import { QrAlumnoPage } from './qr-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrAlumnoPageRoutingModule
  ],
  declarations: [QrAlumnoPage]
})
export class QrAlumnoPageModule {}
