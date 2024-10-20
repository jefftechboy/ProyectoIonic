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
 
  constructor(
    public lg:LoginService,
    public hh: AsistenciaAlumnoService,
    public vp:NavController,
    public cd:CursoDocenteService
  ) {}
  
  ngOnInit() {
    this.AsignaturasGeneralesDocente();
  }


  /*------------------------------- LISTAS DE ALMACENAMIENTO DE INFORMACION ----------------------- */
  // LISTA ASIGNATURAS
  TodaAsignatura: any[] = [];
  // SECCIONES ALMACENADAS POR ASIGNATURA
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  // ALMACENA NOMBRE DEL USUARIO SE ASOCIA AL NOMBRE DEL PROFESOR
  nombreProfesor:String =  this.lg.nombreAlumno;


 /*-------------------------------FUNCION QUE GUARDA DATOS PARA DETALLE ----------------------- */
  guardarDatosAsignatura(asignaturaId: string, seccionId: string, profesor: string) {
    this.cd.guardarDatosAsignatura(asignaturaId,seccionId,profesor);
    this.vp.navigateForward("/listCurDocDetalle")
    console.log("Guardado exitosamente")
  }
  
 /*-------------------FUNCION QUE RECOPILA ASIGNATURAS / SECCIONES SEGUN EL PROFESOR ---------- */
   // TODAS LAS ASIGNATURAS
   AsignaturasGeneralesDocente() {
    this.hh.TodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;
      // SECCIONES SEGUN ASIGNATURA
      this.TodaAsignatura.forEach(curso => {
        this.cd.SeccionesPorAsignaturaProfesor(curso.id,this.nombreProfesor).subscribe(secciones => {
          //FILTRO POR NOMBRE DEL DOCENTE
          secciones.forEach(sec => {
            console.log(this.nombreProfesor)
            console.log(sec.Profesor)
            console.log(sec.Profesor === this.nombreProfesor)
            if ((sec.Profesor === this.nombreProfesor) == true) {
              this.SeccionesPorAsignatura[curso.id] = secciones;
              console.log("SI ingreso")
            }else{
              console.log("NO ingreso")
            }
          })          
        });
      });
    });
  }

  }
  
  
  



