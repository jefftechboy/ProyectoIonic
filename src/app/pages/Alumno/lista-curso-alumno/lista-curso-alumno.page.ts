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






@Component({
  selector: 'app-lista-curso-alumno',
  templateUrl: './lista-curso-alumno.page.html',
  styleUrls: ['./lista-curso-alumno.page.scss'],
})
export class ListaCursoAlumnoPage implements OnInit {
  constructor(public aa:AsistenciaAlumnoService) { }


  ngOnInit() {
    this.AsignaturasGenerales();
  }
  


  // LISTA ASIGNATURA
  TodaAsignatura: any[] = [];
  // SECCIONES ALMACENADAS POR ID DE ASIGNATURAS
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  // Objeto que almacenará los alumnos por sección, usando el ID de la asignatura y el código de la sección
  AlumnosPorSeccion: { [key: string]: { [key: string]: any[] } } = {};
  // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
  AsistenciaPorAlumno: { [key: string]: { [key: string]: { [key: string]: any[] } } } = {};

  
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


    

   

}
