import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-lista-asistencia-tomada',
  templateUrl: './lista-asistencia-tomada.page.html',
  styleUrls: ['./lista-asistencia-tomada.page.scss'],
})
export class ListaAsistenciaTomadaPage implements OnInit {

  constructor(private NavController: NavController,private alertController: AlertController) { }
  
  ngOnInit() {
  }


  // Método para mostrar el primer alert
  async presentFirstAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia Guardada Exitosamente',
      buttons: ['OK']
    });
    this.NavController.navigateForward("/home")
    await alert.present();
  }

  // Método para mostrar el segundo alert
  async presentSecondAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia Grabada',
      message: '¿Desea confirmar la asistencia tomada?',
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





  i: number = 1;
  maxNumber: number = 10;
  getNumbers(): number[] {
    const numbers = [];
    for (let num = this.i; num <= this.maxNumber; num++) {
      numbers.push(num);
    }
    return numbers;
  }
}
