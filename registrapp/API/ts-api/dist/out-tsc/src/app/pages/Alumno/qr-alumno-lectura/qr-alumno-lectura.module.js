import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrAlumnoLecturaPageRoutingModule } from './qr-alumno-lectura-routing.module';
import { QrAlumnoLecturaPage } from './qr-alumno-lectura.page';
let QrAlumnoLecturaPageModule = class QrAlumnoLecturaPageModule {
};
QrAlumnoLecturaPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QrAlumnoLecturaPageRoutingModule
        ],
        declarations: [QrAlumnoLecturaPage]
    })
], QrAlumnoLecturaPageModule);
export { QrAlumnoLecturaPageModule };
//# sourceMappingURL=qr-alumno-lectura.module.js.map