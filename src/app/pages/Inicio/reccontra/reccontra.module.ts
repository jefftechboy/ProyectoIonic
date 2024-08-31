import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReccontraPageRoutingModule } from './reccontra-routing.module';

import { ReccontraPage } from './reccontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReccontraPageRoutingModule
  ],
  declarations: [ReccontraPage]
})
export class ReccontraPageModule {}
