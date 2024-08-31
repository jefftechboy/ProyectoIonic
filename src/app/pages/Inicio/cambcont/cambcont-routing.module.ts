import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambcontPage } from './cambcont.page';

const routes: Routes = [
  {
    path: '',
    component: CambcontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambcontPageRoutingModule {}
