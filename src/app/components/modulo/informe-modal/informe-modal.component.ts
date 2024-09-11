import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-informe-modal',
  templateUrl: './informe-modal.component.html',
  styleUrls: ['./informe-modal.component.scss'],
})
export class InformeModalComponent {

  constructor(private modalController: ModalController,
    private NavController: NavController,
    private alertController: AlertController) {}

  dismiss() {
    this.modalController.dismiss();
  }
// Método para mostrar el primer alert
async presentFirstAlert() {
  const alert = await this.alertController.create({
    header: 'Informe Enviado Exitosamente',
    buttons: ['OK']
  });
  this.NavController.navigateForward("/home")
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
}
