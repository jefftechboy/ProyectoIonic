import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoCursoDocenteDetallePageRoutingModule } from './listado-curso-docente-detalle-routing.module';

import { ListadoCursoDocenteDetallePage } from './listado-curso-docente-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoCursoDocenteDetallePageRoutingModule
  ],
  declarations: [ListadoCursoDocenteDetallePage]
})
export class ListadoCursoDocenteDetallePageModule {}
