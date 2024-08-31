import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsistenciaTomadaPageRoutingModule } from './lista-asistencia-tomada-routing.module';

import { ListaAsistenciaTomadaPage } from './lista-asistencia-tomada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciaTomadaPageRoutingModule
  ],
  declarations: [ListaAsistenciaTomadaPage]
})
export class ListaAsistenciaTomadaPageModule {}
