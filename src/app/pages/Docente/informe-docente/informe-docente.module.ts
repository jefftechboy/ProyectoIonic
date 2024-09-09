import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeDocentePageRoutingModule } from './informe-docente-routing.module';

import { InformeDocentePage } from './informe-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeDocentePageRoutingModule
  ],
  declarations: [InformeDocentePage]
})
export class InformeDocentePageModule {}
