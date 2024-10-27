import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaCursoAlumnoPageRoutingModule } from './lista-curso-alumno-routing.module';
import { ListaCursoAlumnoPage } from './lista-curso-alumno.page';
let ListaCursoAlumnoPageModule = class ListaCursoAlumnoPageModule {
};
ListaCursoAlumnoPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            ListaCursoAlumnoPageRoutingModule
        ],
        declarations: [ListaCursoAlumnoPage]
    })
], ListaCursoAlumnoPageModule);
export { ListaCursoAlumnoPageModule };
//# sourceMappingURL=lista-curso-alumno.module.js.map