import { Component, OnInit } from '@angular/core';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { forkJoin, Observable } from 'rxjs';
import { LoginPage } from '../../Inicio/login/login.page';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { switchMap } from 'rxjs';
  import { map } from 'rxjs';
  import { NavController } from '@ionic/angular';
  import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
@Component({
  selector: 'app-listado-curso-docente',
  templateUrl: './listado-curso-docente.page.html',
  styleUrls: ['./listado-curso-docente.page.scss'],
})
export class ListadoCursoDocentePage implements OnInit {
 // LISTA ASIGNATURA
 Profesor: any[] = [];
  // LISTA ASIGNATURA
  TodaAsignatura: any[] = [];
  // SECCIONES ALMACENADAS POR ID DE ASIGNATURAS
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  // Objeto que almacenará los alumnos por sección, usando el ID de la asignatura y el código de la sección
  AlumnosPorSeccion: { [key: string]: { [key: string]: any[] } } = {};
  // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
  AsistenciaPorAlumno: { [key: string]: { [key: string]: { [key: string]: any[] } } } = {};
  
  
  nombreProfesor:String =  this.lg.nombreAlumno;
  
  constructor(
    public lg:LoginService,
    public hh: AsistenciaAlumnoService,
    public vp:NavController,
    public cd:CursoDocenteService
  ) {}
  
  ngOnInit() {
    this.AsignaturasGeneralesDocente();
  }



  guardarDatosAsignatura(asignaturaId: string, seccionId: string, profesor: string) {
    this.cd.guardarDatosAsignatura(asignaturaId,seccionId,profesor);
    this.vp.navigateForward("/listCurDocDetalle")
    console.log("Guardado exitosamente")
  }

   // Calcula todas
   AsignaturasGeneralesDocente() {
    this.hh.TodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;
  
      // Buscar secciones según ID de asignatura
      this.TodaAsignatura.forEach(curso => {
        this.hh.SeccionesPorAsignatura(curso.id).subscribe(secciones => {

          // Filtro Por Profesor
          secciones.forEach(sec => {
            console.log(this.nombreProfesor)
            console.log(sec.Profesor)
            console.log(sec.Profesor === this.nombreProfesor)
            if ((sec.Profesor === this.nombreProfesor)) {
              this.SeccionesPorAsignatura[curso.id] = secciones;
            }
          }) 

          secciones.forEach(seccion => {
            this.hh.alumnoPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
              
              
              
              if (!this.AlumnosPorSeccion[curso.id]) {
                this.AlumnosPorSeccion[curso.id] = {};
              }
          
              // Filtrar alumnos por nombre "Roberto Huaitro"
              const docenteFiltrados = alumnos
          
              this.AlumnosPorSeccion[curso.id][seccion.id] = docenteFiltrados;
          
              // Crear una estructura para almacenar asistencia por alumno
              if (!this.AsistenciaPorAlumno[curso.id]) {
                this.AsistenciaPorAlumno[curso.id] = {};
              }
              if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
                this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
              }
          
              // Iterar solo sobre los alumnos filtrados para obtener su asistencia
              docenteFiltrados.forEach(alumno => {
                this.hh.EstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
                  // Almacenar asistencia por asignatura, sección y alumno
                  this.AsistenciaPorAlumno[curso.id][seccion.id][alumno.id] = asistencia;
                });
              });
            });
          });
          
        });
      });
    });
  }

  }
  
  
  



