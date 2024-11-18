import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { CursoDocenteService } from 'src/app/servicios/detalle/curso-docente.service';
import { DetalleAsistenciaService } from 'src/app/servicios/docente/detalle-asistencia.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface Alumno {
  id: string;
  NombreAlumno: string;
  Asistencia?: number;
  Estado?: string;
}

interface AsistenciaDetalle {
  Estado: 'Presente' | 'Ausente';
}

@Component({
  selector: 'app-informe-modal',
  templateUrl: './informe-modal.component.html',
  styleUrls: ['./informe-modal.component.scss'],
})
export class InformeModalComponent {
  data: Alumno[] = [];
  AlumnosPorSeccion: Alumno[] = [];
  asistenciaDetalle: { [key: string]: AsistenciaDetalle[] } = {};

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private alertController: AlertController,
    private afs: AngularFirestore,
    public dc: CursoDocenteService,
    public hh: DetalleAsistenciaService
  ) {}

  obtenerAlumnosPorSeccion(asignatura: string, seccion: string) {
    return this.afs
      .collection('Asignatura')
      .doc(asignatura)
      .collection('Seccion')
      .doc(seccion)
      .collection('Alumno')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Alumno;
            const id = a.payload.doc.id;
            return { ...data, id }; // Asignar id correctamente
          })
        )
      );
  }

  calcularPorcentajePresencias(detalles: AsistenciaDetalle[]): string {
    if (!detalles || detalles.length === 0) return '0%';
    const total = detalles.length;
    const presentes = detalles.filter((d) => d.Estado === 'Presente').length;
    const porcentaje = (presentes / total) * 100;
    return `${porcentaje.toFixed(2)}%`;
  }

  async procesarAsistencia(asignatura: string, seccion: string): Promise<Alumno[]> {
    return new Promise((resolve) => {
      this.obtenerAlumnosPorSeccion(asignatura, seccion).subscribe((alumnos: Alumno[]) => {
        alumnos.forEach((alumno) => {
          this.hh.EstadoAsistenciaAlumno(asignatura, seccion, alumno.id).subscribe((detalles) => {
            this.asistenciaDetalle[alumno.id] = detalles;

            const porcentajeStr = this.calcularPorcentajePresencias(detalles);
            const porcentaje = parseFloat(porcentajeStr);

            alumno.Asistencia = porcentaje;
            alumno.Estado = porcentaje >= 75 ? 'Aprobado' : 'Reprobado';
          });
        });
        setTimeout(() => resolve(alumnos), 2000);
      });
    });
  }

  async generatePdf(asignatura: string, seccion: string) {
    const alumnos = await this.procesarAsistencia(asignatura, seccion);

    const alumnosData = alumnos.map((alumno) => [
      alumno.id ?? 'Sin nombre', // Verificar si NombreAlumno está correctamente asignado
      alumno.Asistencia?.toString() ?? '0%', 
      alumno.Estado ?? 'Desconocido'
    ]);

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Informe de alumnos reprobados por inasistencia', fontSize: 16, bold: true, margin: [0, 0, 0, 8] },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              [{ text: 'Nombre alumno', bold: true }, { text: 'Porcentaje de asistencia', bold: true }, { text: 'Estado', bold: true }],
              ...alumnosData,
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download('Informe.pdf');
    this.presentFirstAlert();
  }

  async showAlerts() {
    await this.presentSecondAlert();
  }

  async presentFirstAlert() {
    const alert = await this.alertController.create({
      header: 'Informe Enviado Exitosamente',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async alertError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentSecondAlert() {
    const alert = await this.alertController.create({
      header: 'Descarga de Informe',
      message: '¿Confirma formato descarga?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            const asignatura = localStorage.getItem('asignaturaSeleccionada');
            if (asignatura) {
              const asignaturaObj = JSON.parse(asignatura);
              this.generatePdf(asignaturaObj.nombre, asignaturaObj.seccion);
              this.dismiss();
            } else {
              this.alertError('No se encontró asignatura en nuestros registros.');
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
