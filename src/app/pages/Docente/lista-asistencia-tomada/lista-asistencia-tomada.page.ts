import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
@Component({
  selector: 'app-lista-asistencia-tomada',
  templateUrl: './lista-asistencia-tomada.page.html',
  styleUrls: ['./lista-asistencia-tomada.page.scss'],
})
export class ListaAsistenciaTomadaPage implements OnInit {

  
  constructor(
    private router: Router,
    private NavController: NavController,
    private alertController: AlertController,
    private menuController: MenuController,
    public aa:LoginService,
    public hh:ClaseActualService,
    public aas:AsistenciaAlumnoService
  ) {}

  navigateAndClose(path: string) {
    this.router.navigate([path]).then(() => {
      this.menuController.close('end'); // 'end' es el ID del menú, ajusta si es necesario
    });
  }
  nombreUsuario:String= this.aa.nombreAlumno;

  ngOnInit() {
    this.claseEnProcesoDocente();
    // Establece la fecha actual al inicio
    this.hoy = new Date();
    this.hoy.setHours(0, 0, 0, 0); // Asegura que la hora sea 00:00:00
  }
  hoy: Date = new Date(); // Crea la fecha actual

  

/* -------------------------- CONSULTA DE LA CLASE ACTUAL --------------------------- */
  asignaturas: Observable<any[]>; // Cambia a un observable
  secciones: Observable<any[]>; // Cambia a un observable
  horario: Observable<any[]>; // Cambia a un observable
  alumno: Observable<any[]>; // Cambia a un observable
  
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
    horaInicio: string
    ,horaFin: string }[] = [];
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
        if (this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin)) {
          this.claseActualDocente.push(item);
          this.alumno = this.hh.alumnoPorSeccion(item.asignaturaId,item.seccionId);
        }
    }
    this.obtencionDatosClases();
  }
/* ----------------------ALERTAS DE CONFIRMACION----------------------------------------------------------------- */
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
/* -------------- LISTADOS DE ALUMNOS DE LA ASIGNATURA Y SECCION -------------- */
nombreAsignatura: string = '';
nombreSeccion: string = '';
AlumnosPorSeccion: Observable<any[]>;
AsistenciaPorAlumno: { [id: string]: any[] } = {}; // Almacena las asistencias filtradas

 obtencionDatosClases() {
    for (let clase of this.claseActualDocente) {
      this.nombreAsignatura = clase.asignaturaId;
      this.nombreSeccion = clase.seccionId;
    }
    console.log(this.nombreAsignatura);
    console.log(this.nombreSeccion);

    // Obtiene los alumnos por sección
    this.AlumnosPorSeccion = this.hh.alumnoPorSeccion(this.nombreAsignatura, this.nombreSeccion);

    // Carga las asistencias y filtra por fecha
    this.AlumnosPorSeccion.subscribe(data => {
      for (let alumno of data) {
        this.hh.asistenciaAlumno(this.nombreAsignatura, this.nombreSeccion, alumno.id).subscribe(asistencias => {
          // Filtra las asistencias según la fecha
          const asistenciasFiltradas = asistencias.filter(asistencia => {
            const fechaAsistencia = asistencia.Fecha.toDate();
            fechaAsistencia.setHours(0, 0, 0, 0); // Asegura que la hora sea 00:00:00
            return fechaAsistencia.getTime() === this.hoy.getTime();
          });
          // Guarda las asistencias filtradas
          this.AsistenciaPorAlumno[alumno.id] = asistenciasFiltradas;
        });
      }
    });
  }

 // Método para registrar asistencia
 registrarAsistencia(alumnoNombre:string,IdClase:string,estado: string) {
  //Hizo El cambio para dejarlo presente
  if (estado === "Presente") {
    this.aas.registrarAsentenciaPresente(this.nombreAsignatura, this.nombreSeccion, alumnoNombre, IdClase)
  }else{
    this.aas.eliminarAsentenciaPresente(this.nombreAsignatura, this.nombreSeccion, alumnoNombre, IdClase)
  }


  
/* -------------------------------------------------------------------------- */ 

}
}
