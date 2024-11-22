import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    { nombre: 'App Movil', seccion: '007D', horario: 'Miercoles 08:31-09:50  y  Viernes: 08:31-10:40' },
    { nombre: 'App Movil', seccion: '010D', horario: 'Martes 10:00-11:30  y  Jueves: 10:00-12:10' },
    { nombre: 'App Movil', seccion: '012V', horario: 'Lunes 18:00-19:30  y  Miercoles: 18:00-20:10' },
    { nombre: 'Desarrollo de Software', seccion: '003P', horario: 'Lunes 08:31-09:50  y  Viernes: 08:31-10:40' },
    { nombre: 'Desarrollo de Software', seccion: '005P', horario: 'Martes 10:00-11:30  y  Viernes: 10:00-12:10' },
    { nombre: 'Desarrollo de Software', seccion: '007P', horario: 'Lunes 18:00-19:30  y  Martes: 18:00-20:10' },
  ];

  constructor(private modalController: ModalController,private afs: AngularFirestore) {}

  ngOnInit() {
    this.getAsignaturas().then(asignaturas => {
      console.log('Asignaturas recibidas:', asignaturas);
    }).catch(err => {
      console.error('Error al obtener las asignaturas:', err);
    });
  }

  // Método separado para obtener las asignaturas
  getAsignaturas(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.afs.collection('Asignatura')
        .snapshotChanges()
        .subscribe({
          next: (actions: any[]) => {
            const asignaturas: string[] = [];
            
            if (actions.length === 0) {
              resolve(asignaturas); // Retornamos un array vacío si no hay asignaturas
            } else {
              actions.forEach(a => {
                const data = a.payload.doc.data() as { Codigo: string, nombre: string };
            
                if (data) {
                  asignaturas.push(data.Codigo);
                }
              });
              
              resolve(asignaturas); // Retornamos las asignaturas cuando estén listas
            }
          },
          error: (err) => {
            console.error('Error al obtener las asignaturas:', err);
            reject(err); // En caso de error, rechazamos la promesa
          }
        });
    });
  }

  // Especifica el tipo del parámetro asignatura
  async openModal(asignatura: Asignatura) {
    try {
      localStorage.setItem("asignaturaSeleccionada",JSON.stringify(asignatura));
      const modal = await this.modalController.create({
        component: InformeModalComponent,
        componentProps: {
          asignatura: asignatura
        }
      });
      return await modal.present();
    } catch (error) {
      return;
    }

  }
}