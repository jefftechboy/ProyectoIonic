import { __decorate } from "tslib";
import { Injectable, Component } from '@angular/core';
let ReccontraPage = class ReccontraPage {
    constructor(toastController, loginService) {
        this.toastController = toastController;
        this.loginService = loginService;
    }
    async actualizarContrasena() {
        if (!this.usuario || !this.nuevaContrasena) {
            this.mostrarToast('Por favor, completa todos los campos.', 'danger');
            return;
        }
        try {
            await this.loginService.updatePasswordInFirestore(this.usuario, this.nuevaContrasena);
            this.limpiarCampos();
            this.mostrarToast('Contraseña actualizada correctamente, Vuelve a Ingresar.', 'success');
        }
        catch (error) {
            this.mostrarToast('Error al actualizar la contraseña. Verifica los datos Ingresados.', 'danger');
        }
    }
    limpiarCampos() {
        this.usuario = '';
        this.nuevaContrasena = '';
    }
    async mostrarToast(mensaje, color) {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 3000,
            position: 'top',
            color: color,
        });
        toast.present();
    }
};
ReccontraPage = __decorate([
    Component({
        selector: 'app-reccontra',
        templateUrl: './reccontra.page.html',
        styleUrls: ['./reccontra.page.scss'],
    }),
    Injectable({
        providedIn: 'root'
    })
], ReccontraPage);
export { ReccontraPage };
//# sourceMappingURL=reccontra.page.js.map