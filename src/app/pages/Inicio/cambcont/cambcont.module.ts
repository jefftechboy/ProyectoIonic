import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambcontPageRoutingModule } from './cambcont-routing.module';

import { CambcontPage } from './cambcont.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambcontPageRoutingModule
  ],
  declarations: [CambcontPage]
})
export class CambcontPageModule {}
