import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudpersonaPage } from './crudpersona.page';
const routes = [
    {
        path: '',
        component: CrudpersonaPage
    }
];
let CrudpersonaPageRoutingModule = class CrudpersonaPageRoutingModule {
};
CrudpersonaPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], CrudpersonaPageRoutingModule);
export { CrudpersonaPageRoutingModule };
//# sourceMappingURL=crudpersona-routing.module.js.map