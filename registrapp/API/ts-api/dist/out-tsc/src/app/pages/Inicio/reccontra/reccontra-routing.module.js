import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReccontraPage } from './reccontra.page';
const routes = [
    {
        path: '',
        component: ReccontraPage
    }
];
let ReccontraPageRoutingModule = class ReccontraPageRoutingModule {
};
ReccontraPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], ReccontraPageRoutingModule);
export { ReccontraPageRoutingModule };
//# sourceMappingURL=reccontra-routing.module.js.map