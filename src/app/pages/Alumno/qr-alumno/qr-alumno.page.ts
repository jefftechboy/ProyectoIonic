import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-alumno',
  templateUrl: './qr-alumno.page.html',
  styleUrls: ['./qr-alumno.page.scss'],
})
export class QrAlumnoPage implements OnInit {

  constructor(private alertController: AlertController, private navCtrl: NavController) { 
    

  }
  alertButtons = ['Verificar'];
  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Verificacion',
      message: 'Ingresa el codigo enviado a tu celular',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');
            // Redirige a otra página aquí
            this.navCtrl.navigateForward('/QrAlumnoLectura'); // Reemplaza '/otra-pagina' con la ruta deseada
          }
        }
      ]
    });
  
    await alert.present();
  }
  
}
