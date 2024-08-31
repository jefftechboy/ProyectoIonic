import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoCursoDocentePageRoutingModule } from './listado-curso-docente-routing.module';

import { ListadoCursoDocentePage } from './listado-curso-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoCursoDocentePageRoutingModule
  ],
  declarations: [ListadoCursoDocentePage]
})
export class ListadoCursoDocentePageModule {}
