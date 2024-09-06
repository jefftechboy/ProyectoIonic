import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-informe-modal',
  templateUrl: './informe-modal.component.html',
  styleUrls: ['./informe-modal.component.scss'],
})
export class InformeModalComponent {

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  simulatePDFGeneration() {
    console.log('Simular generación de PDF');
    // Mostrar un mensaje o una alerta
  }

  simulateExcelGeneration() {
    console.log('Simular generación de Excel');
    // Mostrar un mensaje o una alerta
  }

  simulateEmailSending() {
    console.log('Simular envío de correo');
    // Mostrar un mensaje o una alerta
  }
}
