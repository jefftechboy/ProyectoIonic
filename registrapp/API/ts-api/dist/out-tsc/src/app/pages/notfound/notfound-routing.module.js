import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundPage } from './notfound.page';
const routes = [
    {
        path: '',
        component: NotfoundPage
    }
];
let NotfoundPageRoutingModule = class NotfoundPageRoutingModule {
};
NotfoundPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], NotfoundPageRoutingModule);
export { NotfoundPageRoutingModule };
//# sourceMappingURL=notfound-routing.module.js.map