import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QrCodeModule } from 'ng-qrcode'
import {  OnInit } from '@angular/core';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { Observable } from 'rxjs';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    private geolocation: Geolocation,
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
    this. obtenerUbicacion()

  }
  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log('Latitud:', latitude);
      console.log('Longitud:', longitude);

      // Agregar latitud y longitud al arreglo
      this.datosAsignaturaDocente = [
        this.hh.asignaturaNombre,
        this.hh.seccionNombre,
        this.hh.dia,
        this.hh.horaInicio,
        this.hh.horaFin,
        latitude.toString(), // Convertir a string
        longitude.toString() // Convertir a string
      ];
      console.log(this.datosAsignaturaDocente);
      console.log(this.datosAsignaturaDocente[5]);
      console.log(this.datosAsignaturaDocente[6]);
      // Generar el arreglo en formato JSON
      this.datosAsignaturaJSON = JSON.stringify(this.datosAsignaturaDocente);
    })
  }

}
