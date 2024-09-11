import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InformeModalComponent } from 'src/app/components/modulo/informe-modal/informe-modal.component'; // Ajusta la ruta según la estructura de tu proyecto

interface Asignatura { // Define la interfaz aquí
  nombre: string;
  seccion: string;
  horario: string;
}

@Component({
  selector: 'app-informe-docente',
  templateUrl: './informe-docente.page.html',
  styleUrls: ['./informe-docente.page.scss'],
})
export class InformeDocentePage implements OnInit {
  // Usa la interfaz para definir el array de asignaturas
  asignaturas: Asignatura[] = [
    { nombre: 'Aplicacion Movil', seccion: '007D', horario: 'Lunes 08:00-10:00  y  Viernes: 08:30-09:50' },
    { nombre: 'Programacion Web', seccion: '011D', horario: 'Martes 08:30-09:50 y  Miercoles: 08:30-09:50 ' },
    { nombre: 'Fundamentos de Programacion', seccion: '015D', horario: 'Jueves 08:30:00-10:40 y Martes 10:00-12:00' },
    { nombre: 'Modelamiento Base de Datos', seccion: '008D', horario: 'Jueves 17:00-19:00 y Miercoles 14:30-16:40' },
    { nombre: 'Desarrollo Software', seccion: '012D', horario: 'Viernes 10:00-12:50 y Lunes 15:30-17:00 ' }
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // Especifica el tipo del parámetro asignatura
  async openModal(asignatura: Asignatura) {
    const modal = await this.modalController.create({
      component: InformeModalComponent,
      componentProps: {
        asignatura: asignatura
      }
    });
    return await modal.present();
  }
}