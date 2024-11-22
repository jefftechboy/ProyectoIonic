import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';  // Asegúrate de importar ModalController
import { InformeModalComponent } from 'src/app/components/modulo/informe-modal/informe-modal.component';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { LoginService } from 'src/app/servicios/inicio/login.service';

// Interfaz de Asignatura
interface Asignatura {
  asignatura: string;  // Nombre de la asignatura
  secciones: string[];  // Lista de secciones
}

@Component({
  selector: 'app-informe-docente',
  templateUrl: './informe-docente.page.html',
  styleUrls: ['./informe-docente.page.scss'],
})
export class InformeDocentePage implements OnInit {
  asignaturas: Asignatura[] = [];  // Array para almacenar las asignaturas

  constructor(
    public lg: LoginService,
    public hh: AsistenciaAlumnoService,
    public vp: NavController,
    public cd: CursoDocenteService,
    private modalController: ModalController  // Agrega ModalController aquí
  ) { }

  ngOnInit() {
    this.AsignaturasGeneralesDocente();
  }

  TodaAsignatura: any[] = [];
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  nombreProfesor: String = this.lg.nombreAlumno;

  AsignaturasGeneralesDocente() {
    this.hh.TodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data;
      console.log('Datos recibidos para todas las asignaturas:', this.TodaAsignatura);

      // SECCIONES SEGÚN ASIGNATURA
      this.TodaAsignatura.forEach(curso => {
        this.cd.SeccionesPorAsignaturaProfesor(curso.id, this.nombreProfesor).subscribe(secciones => {
          secciones.forEach(sec => {
            if ((sec.Profesor === this.nombreProfesor)) {
              this.SeccionesPorAsignatura[curso.id] = secciones;
              console.log('Secciones de la asignatura:', secciones);
              // Aquí agregamos la asignatura y sus secciones a la lista
              this.asignaturas.push({
                asignatura: curso.nombre, // El nombre de la asignatura
                secciones: secciones.map(sec => sec.NombreSeccion) // Mapeamos solo el nombre de la sección
              });
            }
          });
        });
      });

      console.log('Asignaturas con secciones:', this.asignaturas);
    });
  }


  // Método para abrir el modal y pasar la asignatura seleccionada
  async openModal(asignatura: Asignatura) {
    try {
      localStorage.setItem("asignaturaSeleccionada", JSON.stringify(asignatura));  // Guardar en localStorage
      const modal = await this.modalController.create({
        component: InformeModalComponent,  // Componente del modal
        componentProps: {
          asignatura: asignatura  // Pasar la asignatura al modal
        }
      });
      return await modal.present();  // Mostrar el modal
    } catch (error) {
      console.error('Error al abrir el modal:', error);  // Manejo de errores
    }
  }
}
