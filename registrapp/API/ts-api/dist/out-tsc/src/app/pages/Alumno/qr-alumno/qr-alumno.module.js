import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrAlumnoPageRoutingModule } from './qr-alumno-routing.module';
import { QrAlumnoPage } from './qr-alumno.page';
let QrAlumnoPageModule = class QrAlumnoPageModule {
};
QrAlumnoPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QrAlumnoPageRoutingModule
        ],
        declarations: [QrAlumnoPage]
    })
], QrAlumnoPageModule);
export { QrAlumnoPageModule };
//# sourceMappingURL=qr-alumno.module.js.map