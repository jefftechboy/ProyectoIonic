import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReccontraPage } from './reccontra.page';

const routes: Routes = [
  {
    path: '',
    component: ReccontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReccontraPageRoutingModule {}
