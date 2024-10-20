import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { DetalleAsistenciaService } from 'src/app/servicios/docente/detalle-asistencia.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-listado-curso-docente-detalle',
  templateUrl: './listado-curso-docente-detalle.page.html',
  styleUrls: ['./listado-curso-docente-detalle.page.scss'],
})
export class ListadoCursoDocenteDetallePage implements OnInit {

  constructor(
    public dc:CursoDocenteService, 
    public hh:DetalleAsistenciaService,
    private modalController: ModalController,
  ) { }

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

  isModalOpen = false;
  selectedId: string;

  // Método para calcular el porcentaje de presencias
  calcularPorcentajePresencias(id: string): string {
    const detalles = this.asistenciaDetalle[id];
    if (!detalles || detalles.length === 0) {
      return '0%'; // No hay asistencia registrada
    }

    const total = detalles.length;
    const presentes = detalles.filter(d => d.Estado === 'Presente').length;
    const porcentaje = (presentes / total) * 100;
    return `${porcentaje.toFixed(2)}%`; // Retorna el porcentaje con 2 decimales
  }

  openModal(id: string) {
    this.selectedId = id;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
 

}
