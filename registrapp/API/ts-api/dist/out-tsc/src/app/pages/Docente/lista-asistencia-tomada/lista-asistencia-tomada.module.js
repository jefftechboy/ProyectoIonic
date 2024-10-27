import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaAsistenciaTomadaPageRoutingModule } from './lista-asistencia-tomada-routing.module';
import { ListaAsistenciaTomadaPage } from './lista-asistencia-tomada.page';
let ListaAsistenciaTomadaPageModule = class ListaAsistenciaTomadaPageModule {
};
ListaAsistenciaTomadaPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ListaAsistenciaTomadaPageRoutingModule
        ],
        declarations: [ListaAsistenciaTomadaPage]
    })
], ListaAsistenciaTomadaPageModule);
export { ListaAsistenciaTomadaPageModule };
//# sourceMappingURL=lista-asistencia-tomada.module.js.map