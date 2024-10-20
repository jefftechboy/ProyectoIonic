import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { DetalleAsistenciaService } from 'src/app/servicios/docente/detalle-asistencia.service';
@Component({
  selector: 'app-listado-curso-docente-detalle',
  templateUrl: './listado-curso-docente-detalle.page.html',
  styleUrls: ['./listado-curso-docente-detalle.page.scss'],
})
export class ListadoCursoDocenteDetallePage implements OnInit {

  constructor(public dc:CursoDocenteService, public hh:DetalleAsistenciaService) { }

  AlumnosPorSeccion: any[] = [];
  // Objeto que almacenará asistencia de los alumnos por sección, usando el ID de la asignatura, el código de la sección y el ID del alumno
  asistenciaDetalle: { [key: string]: any[] } = {};

  ngOnInit() {
    console.log(this.dc.asignaturaDocente)
    console.log(this.dc.nombreDocente)
    console.log(this.dc.seccionDocente)
    this.detalleCursoDocente();
  }

  detalleCursoDocente() {
    this.hh.alumnoPorSeccion(
      this.dc.asignaturaDocente,
      this.dc.seccionDocente).subscribe(data => {
        this.AlumnosPorSeccion = data

        data.forEach(alumno => {
          this.hh.EstadoAsistenciaAlumno(
            this.dc.asignaturaDocente,
            this.dc.seccionDocente,
            alumno.id
          ).subscribe(data => {

          for (const hora of data) {
            this.hh.EstadoAsistenciaAlumno(this.dc.asignaturaDocente,this.dc.seccionDocente,alumno.id).subscribe(detalle =>{
              this.asistenciaDetalle[alumno.id] = detalle;

            });
          }
          });
        });
  });
  }
}
