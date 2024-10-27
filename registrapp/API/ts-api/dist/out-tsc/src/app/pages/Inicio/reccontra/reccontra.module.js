import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReccontraPageRoutingModule } from './reccontra-routing.module';
import { ReccontraPage } from './reccontra.page';
let ReccontraPageModule = class ReccontraPageModule {
};
ReccontraPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ReccontraPageRoutingModule
        ],
        declarations: [ReccontraPage]
    })
], ReccontraPageModule);
export { ReccontraPageModule };
//# sourceMappingURL=reccontra.module.js.map