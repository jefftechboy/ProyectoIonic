import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotfoundPageRoutingModule } from './notfound-routing.module';
import { NotfoundPage } from './notfound.page';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ModuloModule } from 'src/app/components/modulo/modulo.module';
let NotfoundPageModule = class NotfoundPageModule {
};
NotfoundPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            NotfoundPageRoutingModule,
            MatSlideToggleModule, MatDatepickerModule, MatInputModule,
            MatFormFieldModule, MatNativeDateModule, ModuloModule,
        ],
        declarations: [NotfoundPage]
    })
], NotfoundPageModule);
export { NotfoundPageModule };
//# sourceMappingURL=notfound.module.js.map