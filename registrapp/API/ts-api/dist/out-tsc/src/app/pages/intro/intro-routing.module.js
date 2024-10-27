import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroPage } from './intro.page';
const routes = [
    {
        path: '',
        component: IntroPage
    }
];
let IntroPageRoutingModule = class IntroPageRoutingModule {
};
IntroPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
    })
], IntroPageRoutingModule);
export { IntroPageRoutingModule };
//# sourceMappingURL=intro-routing.module.js.map