import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QrCodeModule } from 'ng-qrcode'
import {  OnInit } from '@angular/core';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { Observable } from 'rxjs';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
@Component({
  selector: 'app-qr-docente-lectura',
  templateUrl: './qr-docente-lectura.page.html',
  styleUrls: ['./qr-docente-lectura.page.scss'],
})
export class QrDocenteLecturaPage {
  tiempoRestante: number; // Tiempo restante en segundos
  intervalo: any;
  temporizadorIniciado: boolean = false;

  constructor(
    private navController: NavController,
    public QRinfor:AsistenciaAlumnoService,
    public ds:CursoDocenteService,
    public hh:ClaseActualService,
  ) { }
  
  public datosAsignaturaDocente: string[] = [
    this.hh.asignaturaNombre,
    this.hh.seccionNombre,
    this.hh.dia,
    this.hh.horaInicio,
    this.hh.horaFin
  ];
  
  // Generar el arreglo en formato JSON
  public datosAsignaturaJSON: string = JSON.stringify(this.datosAsignaturaDocente);
  
  

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
