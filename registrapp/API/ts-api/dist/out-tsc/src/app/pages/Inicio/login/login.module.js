import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginPage } from './login.page';
let LoginPageModule = class LoginPageModule {
};
LoginPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            LoginPageRoutingModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule
        ],
        declarations: [LoginPage]
    })
], LoginPageModule);
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map