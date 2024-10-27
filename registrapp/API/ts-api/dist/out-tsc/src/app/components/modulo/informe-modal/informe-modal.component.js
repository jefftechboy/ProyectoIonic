import { __decorate } from "tslib";
import { Component } from '@angular/core';
let InformeModalComponent = class InformeModalComponent {
    constructor(modalController, NavController, alertController) {
        this.modalController = modalController;
        this.NavController = NavController;
        this.alertController = alertController;
    }
    dismiss() {
        this.modalController.dismiss();
    }
    // Método para mostrar el primer alert
    async presentFirstAlert() {
        const alert = await this.alertController.create({
            header: 'Informe Enviado Exitosamente',
            buttons: ['OK']
        });
        this.NavController.navigateForward("/home");
        await alert.present();
    }
    // Método para mostrar el segundo alert
    async presentSecondAlert() {
        const alert = await this.alertController.create({
            header: 'Descarga de Informe',
            message: '¿Confirma formato descarga?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Alert canceled');
                        // Optionally, you can also choose to not show the first alert here
                    }
                },
                {
                    text: 'Confirmar',
                    role: 'confirm',
                    handler: () => {
                        this.modalController.dismiss();
                        this.presentFirstAlert();
                    }
                }
            ]
        });
        await alert.present();
    }
    // Método para iniciar el proceso de mostrar alerts
    async showAlerts() {
        await this.presentSecondAlert(); // Start with the second alert
    }
};
InformeModalComponent = __decorate([
    Component({
        selector: 'app-informe-modal',
        templateUrl: './informe-modal.component.html',
        styleUrls: ['./informe-modal.component.scss'],
    })
], InformeModalComponent);
export { InformeModalComponent };
//# sourceMappingURL=informe-modal.component.js.map