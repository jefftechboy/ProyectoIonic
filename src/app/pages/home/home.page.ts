import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Cerrar',
      role: 'confirm',
      handler: () => {
        this.menuController.close('end');
        this.navController.navigateForward("/login");
      },
    },
  ];




  usuario: string = '';
  profileCode: string = '';

  constructor(
    private router: Router,
    private menuController: MenuController,
    private navController: NavController,
    public aa:LoginService,
    public hh:ClaseActualService,
    private asignaturaService: AsistenciaAlumnoService
  ) {}

  navigateAndClose(path: string) {
    this.router.navigate([path]).then(() => {
      this.menuController.close('end'); // 'end' es el ID del menú, ajusta si es necesario
    });
  }

  ngOnInit() {
    this.iterarAsignatura();
  }

  asignaturas: Observable<any[]>; // Cambia a un observable
  secciones: Observable<any[]>; // Cambia a un observable
  alumnos: Observable<any[]>; // Cambia a un observable
  horario: Observable<any[]>; // Cambia a un observable

  vecesCombinadas: { 
    alumnoId: string, 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];

  claseEnProceso: { 
    alumnoId: string, 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];

   //Coleccion segun alumno
   iterarAsignatura() {
    this.asignaturas = this.hh.TodasLasAsignaturas();
    this.asignaturas.subscribe(asignaturas => {
      // Aquí empieza la iteración sobre los valores
      for (const asignatura of asignaturas) {
        // Asegúrate de que asignatura.id existe
        this.secciones = this.hh.SeccionesPorAsignatura(asignatura.id);
        this.secciones.subscribe(secciones => {
          // Aquí empieza la iteración sobre los valores
          for (const seccion of secciones) {
            // Asegúrate de que asignatura.id existe
            this.alumnos = this.hh.alumnoPorSeccion(asignatura.id, seccion.id);
            this.alumnos.subscribe(nombreAlumno => {
              // Aquí empieza la iteración sobre los valores
              for (const nombre of nombreAlumno) {
                // Asegúrate de que asignatura.id existe
                if (nombre.id === "Roberto Huaitro") {
                  this.horario = this.hh.horarioAsignatura(asignatura.id, seccion.id);
                  this.horario.subscribe(horario => {
                    // Aquí empieza la iteración sobre los valores
                    for (const hora of horario) {
                      this.vecesCombinadas.push({
                        alumnoId: nombre.id,
                        asignaturaId: seccion.id,
                        seccionId: asignatura.id,
                        dia: hora.id,
                        horaInicio: hora["Hora Inicio"],
                        horaFin: hora["Hora Fin"]
                      });
                    }
                    // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
                    this.claseEnProcesoMetodo();
                  });
                }
              }
            });
          }
        });
      }
    });
  }
  
  
  claseEnProcesoMetodo() {
    this.claseEnProceso = []; // Limpiar el array al inicio
    for (const item of this.vecesCombinadas) {  
        console.log((item.dia+item.horaInicio+item.horaFin))
        console.log(this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin))
        if (this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin)) {
          this.claseEnProceso.push(item);
        }
    }
    /*
    for (const a of this.claseEnProceso){
      console.log(a.seccionId)
    }
    */
  }
  
  






}
