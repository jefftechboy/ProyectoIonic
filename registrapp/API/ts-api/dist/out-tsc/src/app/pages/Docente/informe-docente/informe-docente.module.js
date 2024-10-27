import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InformeDocentePageRoutingModule } from './informe-docente-routing.module';
import { InformeDocentePage } from './informe-docente.page';
let InformeDocentePageModule = class InformeDocentePageModule {
};
InformeDocentePageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            InformeDocentePageRoutingModule
        ],
        declarations: [InformeDocentePage]
    })
], InformeDocentePageModule);
export { InformeDocentePageModule };
//# sourceMappingURL=informe-docente.module.js.map