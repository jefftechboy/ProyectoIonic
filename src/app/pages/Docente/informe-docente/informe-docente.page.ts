import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InformeModalComponent } from 'src/app/components/informe-modal/informe-modal.component'; // Ajusta la ruta según la estructura de tu proyecto

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
    { nombre: 'Aplicacion Movil', seccion: 'A', horario: 'Lunes 08:00-10:00' },
    { nombre: 'Programacion Web', seccion: 'B', horario: 'Martes 10:00-12:00' },
    { nombre: 'Fundamentos de Programacion', seccion: 'C', horario: 'Miércoles 14:00-16:00' },
    { nombre: 'Modelamiento Base de Datos', seccion: 'D', horario: 'Jueves 16:00-18:00' },
    { nombre: 'Desarrollo Software', seccion: 'E', horario: 'Viernes 09:00-11:00' }
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