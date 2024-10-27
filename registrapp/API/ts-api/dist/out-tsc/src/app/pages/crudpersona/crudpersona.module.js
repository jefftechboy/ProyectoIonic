import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CrudpersonaPageRoutingModule } from './crudpersona-routing.module';
import { CrudpersonaPage } from './crudpersona.page';
let CrudpersonaPageModule = class CrudpersonaPageModule {
};
CrudpersonaPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            CrudpersonaPageRoutingModule,
            HttpClientModule
        ],
        declarations: [CrudpersonaPage]
    })
], CrudpersonaPageModule);
export { CrudpersonaPageModule };
//# sourceMappingURL=crudpersona.module.js.map