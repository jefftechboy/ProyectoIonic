import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// listado de componentes
import { PieComponent } from '../pie/pie.component';
import { IonicModule } from '@ionic/angular';
let ModuloModule = class ModuloModule {
};
ModuloModule = __decorate([
    NgModule({
        declarations: [PieComponent,],
        imports: [
            CommonModule, IonicModule,
        ], exports: [
            PieComponent,
        ]
    })
], ModuloModule);
export { ModuloModule };
//# sourceMappingURL=modulo.module.js.map