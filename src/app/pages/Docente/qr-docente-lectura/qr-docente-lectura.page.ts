import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QrCodeModule } from 'ng-qrcode'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-docente-lectura',
  templateUrl: './qr-docente-lectura.page.html',
  styleUrls: ['./qr-docente-lectura.page.scss'],
})
export class QrDocenteLecturaPage {
  tiempoRestante: number; // Tiempo restante en segundos
  intervalo: any;
  temporizadorIniciado: boolean = false;

  constructor(private navController: NavController) { }
  
  iniciarTemporizador() {
    this.tiempoRestante = 10; // 300 segundos (5 minutos)
    this.temporizadorIniciado = true;

    // Inicia el temporizador, se ejecuta cada 1 segundo
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo); // Detener el temporizador cuando llegue a 0
        this.temporizadorIniciado = false;
        this.navController.navigateForward('/listAsisTomada');
      }
    }, 1000);
  }

  // Método para convertir los segundos restantes a formato MM:SS
  get tiempoFormateado() {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }
  ngOnInit() {
    this.iniciarTemporizador();
  }
}
