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

  
  // Método para obtener todas las asignaturas
  AsignaturasGenerales(){
    this.aa.TodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;
      
      //Buscar secciones segun ID asignatura
      this.TodaAsignatura.forEach(curso => {
        this.aa.SeccionesPorAsignatura(curso.id).subscribe(secciones => {
          // Almacenar las secciones en el objeto 'SeccionesPorAsignatura' usando el ID de la asignatura
          this.SeccionesPorAsignatura[curso.id] = secciones;


          secciones.forEach(seccion => {
            this.aa.alumnoPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
              // Almacenar los alumnos en el objeto 'AlumnosPorSeccion' usando el ID de la asignatura y el ID de la sección
              if (!this.AlumnosPorSeccion[curso.id]) {
                this.AlumnosPorSeccion[curso.id] = {};
              }
              this.AlumnosPorSeccion[curso.id][seccion.id] = alumnos;
            });
          });





        });
      });

      
    });
  }





    

   




  
}
