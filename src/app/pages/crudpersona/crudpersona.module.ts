import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CrudpersonaPageRoutingModule } from './crudpersona-routing.module';

import { CrudpersonaPage } from './crudpersona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudpersonaPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CrudpersonaPage]
})
export class CrudpersonaPageModule {}
