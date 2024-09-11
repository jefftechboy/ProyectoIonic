import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { InformeModalComponent } from './informe-modal.component';
import { NavController}  from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [InformeModalComponent],
  
})
export class InformeModalModule {
constructor(private NavController: NavController,private alertController: AlertController) { }
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

}
