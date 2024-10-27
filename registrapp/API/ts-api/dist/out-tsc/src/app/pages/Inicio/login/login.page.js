import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
let LoginPage = class LoginPage {
    constructor(alertController, navCtrl, aa) {
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.aa = aa;
        this.hide = true; // Esta es una propiedad
        this.cuentas = [];
        this.usuario = '';
        this.contrasena = '';
    }
    ngOnInit() {
    }
    validar() {
        this.aa.login(this.usuario, this.contrasena).subscribe(data => {
            this.cuentas = data;
            // Mueve la lógica que depende de cuentas aquí
            console.log(this.cuentas.length);
            if (this.cuentas.length > 0) {
                if (this.usuario === this.cuentas[0].Usuario && this.contrasena === this.cuentas[0].Contrasena) {
                    console.log("Campos correctos de inicio de sesión");
                    this.aa.nombreAlumno = this.cuentas[0].Nombre;
                    this.aa.tipoUsuario = this.cuentas[0].Tipo;
                    this.navCtrl.navigateForward("/home");
                }
                else {
                }
            }
            else {
                this.presentAlert();
            }
        }, error => {
            this.presentAlert();
        });
    }
    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Inicio sesión',
            message: 'Usuario o Contraseña Incorrecta',
            buttons: ['Aceptar'],
        });
        await alert.present();
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map