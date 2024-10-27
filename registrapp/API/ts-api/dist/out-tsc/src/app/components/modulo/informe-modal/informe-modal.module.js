import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InformeModalComponent } from './informe-modal.component';
let InformeModalModule = class InformeModalModule {
    constructor(NavController, alertController) {
        this.NavController = NavController;
        this.alertController = alertController;
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
            header: 'Descarga de informe',
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
InformeModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule
        ],
        declarations: [InformeModalComponent],
    })
], InformeModalModule);
export { InformeModalModule };
//# sourceMappingURL=informe-modal.module.js.map