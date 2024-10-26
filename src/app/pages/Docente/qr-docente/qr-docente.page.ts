import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
@Component({
  selector: 'app-qr-docente',
  templateUrl: './qr-docente.page.html',
  styleUrls: ['./qr-docente.page.scss'],
})
export class QrDocentePage implements OnInit {

  constructor(
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    public aa:LoginService,
    public hh:ClaseActualService,
    private asignaturaService: AsistenciaAlumnoService,
    private afs:AngularFirestore,
    public ds:CursoDocenteService,
  ) { }

  ngOnInit() {
    this.claseEnProcesoDocente();
  }
  nombreUsuario:String= this.aa.nombreAlumno;
  nombreDocente:string= this.aa.nombreAlumno.toString();

  
  asignaturas: Observable<any[]>; // Cambia a un observable
  secciones: Observable<any[]>; // Cambia a un observable
  alumnos: Observable<any[]>; // Cambia a un observable
  horario: Observable<any[]>; // Cambia a un observable




  claseActualDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];

  claseProcesoDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];
//Coleccion segun alumno
claseEnProcesoDocente() {
  this.asignaturas = this.hh.TodasLasAsignaturas();
  this.asignaturas.subscribe(asignaturas => {
    // Aquí empieza la iteración sobre los valores
    for (const asignatura of asignaturas) {
      // Asegúrate de que asignatura.id existe
      this.secciones = this.hh.SeccionesPorAsignatura(asignatura.id);
      this.secciones.subscribe(secciones => {
        // Aquí empieza la iteración sobre los valores
        for (const seccion of secciones) {
          if (seccion.Profesor === this.nombreUsuario) {
            this.horario = this.hh.horarioAsignatura(asignatura.id, seccion.id);
            this.horario.subscribe(horario => {
              // Aquí empieza la iteración sobre los valores
              for (const hora of horario) {
                this.claseProcesoDocente.push({
                  asignaturaId: asignatura.id,
                  seccionId: seccion.id,
                  dia: hora.id,
                  horaInicio: hora["Hora Inicio"],
                  horaFin: hora["Hora Fin"]

                });
                
                
              }
              // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
              this.claseEnProcesoMetodoDocente();
            });
          }
        }
      });
    }
  });
}

  claseEnProcesoMetodoDocente() {
    this.claseActualDocente = []; // Limpiar el array al inicio
    for (const item of this.claseProcesoDocente) {  
        console.log((item.dia+item.horaInicio+item.horaFin))
        console.log(this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin))
        if (this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin)) {
          this.claseActualDocente.push(item);
          //DATOS A ENTREGAR EN EL QR
          this.hh.asignaturaNombre = item.asignaturaId;
          this.hh.seccionNombre = item.seccionId;
          this.hh.dia = item.dia;
          this.hh.horaInicio = item.horaInicio;
          this.hh.horaFin = item.horaFin;
        }
    }
  }
}
