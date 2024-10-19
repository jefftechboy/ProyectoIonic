import { Component, OnInit } from '@angular/core';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';



import { Injectable } from '@angular/core';


import { Persona } from 'src/app/model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable,combineLatest } from 'rxjs';
//Importaciones
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/servicios/inicio/login.service';




@Component({
  selector: 'app-lista-curso-alumno',
  templateUrl: './lista-curso-alumno.page.html',
  styleUrls: ['./lista-curso-alumno.page.scss'],
})
export class ListaCursoAlumnoPage implements OnInit {
  constructor(public aa:AsistenciaAlumnoService,public lg:LoginService,
  ) { }


  ngOnInit() {
    this.AsignaturasGenerales();
  }
  
// En tu componente .ts
getAsistenciaPorcentaje() {
  const total = this.asistenciaDetalle.length;
  const presentes = this.asistenciaDetalle.filter(estado => estado.Estado === 'Presente').length;

  return total > 0 ? (presentes / total) * 100 : 0; // Evitar división por cero
}

  // LISTA ASIGNATURA
  TodaAsignatura: any[] = [];
  // SECCIONES ALMACENADAS POR ID DE ASIGNATURAS
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  // Objeto que almacenará los alumnos por sección, usando el ID de la asignatura y el código de la sección
  AlumnosPorSeccion: { [key: string]: { [key: string]: any[] } } = {};
  // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
  AsistenciaPorAlumno: { [key: string]: { [key: string]: { [key: string]: any[] } } } = {};

  // Calcula todas
  AsignaturasGenerales() {
    this.aa.TodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;
  
      // Buscar secciones según ID de asignatura
      this.TodaAsignatura.forEach(curso => {
        this.aa.SeccionesPorAsignatura(curso.id).subscribe(secciones => {
          
          this.SeccionesPorAsignatura[curso.id] = secciones;
  
          secciones.forEach(seccion => {
            this.aa.alumnoPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
              if (!this.AlumnosPorSeccion[curso.id]) {
                this.AlumnosPorSeccion[curso.id] = {};
              }
          
              // Filtrar alumnos por nombre "Roberto Huaitro"
              const alumnosFiltrados = alumnos.filter(alumno => alumno.id === this.lg.nombreAlumno);
          
              this.AlumnosPorSeccion[curso.id][seccion.id] = alumnosFiltrados;
          
              // Crear una estructura para almacenar asistencia por alumno
              if (!this.AsistenciaPorAlumno[curso.id]) {
                this.AsistenciaPorAlumno[curso.id] = {};
              }
              if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
                this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
              }
          
              // Iterar solo sobre los alumnos filtrados para obtener su asistencia
              alumnosFiltrados.forEach(alumno => {
                this.aa.EstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
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
  

  

  // Variables para el modal y la asistencia seleccionada
  isModalOpen = false;
  selectedAlumno = '';
  asistenciaDetalle: any[] = [];

  openModal(cursoId: string, seccionId: string, alumnoId: string) {
    this.selectedAlumno = alumnoId;
    // Aquí se obtiene el detalle de la asistencia del alumno
    this.asistenciaDetalle = this.AsistenciaPorAlumno[cursoId][seccionId][alumnoId];
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


    
// Calcula todas para el profesor 
/*
AsignaturasGeneralesProfesor() {
  this.aa.TodasLasAsignaturas().subscribe(data => {
    this.TodaAsignatura = data;

    // Buscar secciones según ID de asignatura
    this.TodaAsignatura.forEach(curso => {
      this.aa.SeccionesPorAsignatura(curso.id).subscribe(secciones => {
        this.SeccionesPorAsignatura[curso.id] = secciones;

        secciones.forEach(seccion => {
          this.aa.alumnoPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
            if (!this.AlumnosPorSeccion[curso.id]) {
              this.AlumnosPorSeccion[curso.id] = {};
            }
            this.AlumnosPorSeccion[curso.id][seccion.id] = alumnos;

            // Crear una estructura para almacenar asistencia por alumno
            if (!this.AsistenciaPorAlumno[curso.id]) {
              this.AsistenciaPorAlumno[curso.id] = {};
            }
            if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
              this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
            }

            alumnos.forEach(alumno => {
              this.aa.EstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
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
   
*/
}
