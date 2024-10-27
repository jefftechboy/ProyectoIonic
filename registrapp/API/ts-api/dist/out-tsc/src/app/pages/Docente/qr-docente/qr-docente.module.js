import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrDocentePageRoutingModule } from './qr-docente-routing.module';
import { QrDocentePage } from './qr-docente.page';
let QrDocentePageModule = class QrDocentePageModule {
};
QrDocentePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QrDocentePageRoutingModule
        ],
        declarations: [QrDocentePage]
    })
], QrDocentePageModule);
export { QrDocentePageModule };
//# sourceMappingURL=qr-docente.module.js.map