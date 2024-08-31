import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrDocenteLecturaPageRoutingModule } from './qr-docente-lectura-routing.module';

import { QrDocenteLecturaPage } from './qr-docente-lectura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrDocenteLecturaPageRoutingModule
  ],
  declarations: [QrDocenteLecturaPage]
})
export class QrDocenteLecturaPageModule {}
