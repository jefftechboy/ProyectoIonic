import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IntroPageRoutingModule } from './intro-routing.module';
import { IntroPage } from './intro.page';
let IntroPageModule = class IntroPageModule {
};
IntroPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            IntroPageRoutingModule
        ],
        declarations: [IntroPage]
    })
], IntroPageModule);
export { IntroPageModule };
//# sourceMappingURL=intro.module.js.map