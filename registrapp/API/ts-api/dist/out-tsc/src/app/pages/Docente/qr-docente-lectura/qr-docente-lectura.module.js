import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrDocenteLecturaPageRoutingModule } from './qr-docente-lectura-routing.module';
import { QrDocenteLecturaPage } from './qr-docente-lectura.page';
import { QrCodeModule } from 'ng-qrcode'; // Asegúrate de importar esto
let QrDocenteLecturaPageModule = class QrDocenteLecturaPageModule {
};
QrDocenteLecturaPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            QrCodeModule,
            QrDocenteLecturaPageRoutingModule
        ],
        declarations: [QrDocenteLecturaPage]
    })
], QrDocenteLecturaPageModule);
export { QrDocenteLecturaPageModule };
//# sourceMappingURL=qr-docente-lectura.module.js.map