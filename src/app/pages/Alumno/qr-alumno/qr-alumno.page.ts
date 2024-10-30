import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';

import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { ClaseActualService } from 'src/app/servicios/clase/clase-actual.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChekeoEquipoService } from 'src/app/servicios/sms/chekeo-equipo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-alumno',
  templateUrl: './qr-alumno.page.html',
  styleUrls: ['./qr-alumno.page.scss'],
})
export class QrAlumnoPage implements OnInit {

  constructor(
    private alertController: AlertController, 
    private navCtrl: NavController, 
    private router: Router,
    public QRinfor:AsistenciaAlumnoService,

    private menuController: MenuController,
    private navController: NavController,
    public aa:LoginService,
    public hh:ClaseActualService,
    public asistenciaAlumnoService:AsistenciaAlumnoService,
    private smsService: ChekeoEquipoService,
    private toastController: ToastController
  ) { 
    
  }
  ngOnInit() {
    this.claseEnProcesoAlumno();
    this.generarCodigo(); // Genera el código al iniciar
    this.actualizarMensaje(); // Actualiza el mensaje después de generar el código
  }
  
  CodigoEnviado = this.smsService.codigoEnviado;
  nombreUsuario:String= this.aa.nombreAlumno;

  //Variables para SMS
  phoneNumber = '+56982201051'; // Reemplaza con el número del destinatario}


  codigoAsignado:string;
  messageBody: string;
  // Union de mensajes con el codigo
  actualizarMensaje() {
    this.messageBody = `Código de seguridad es: ${this.codigoAsignado}`;
  }
  // Genera codigo matematico
  generarCodigo() {
    this.codigoAsignado = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un número de 6 dígitos
  }
  // Metodo envio de mensaje
  async sendSMS() {
    // Espera a que el mensaje sea enviado
    await this.smsService.sendSMS(this.phoneNumber, this.messageBody);
  
    // Ahora `codigoEnviado` debería tener el SID del mensaje
    this.CodigoEnviado = this.smsService.codigoEnviado;
    
    // Muestra el SID en un alert
    this.ChekeoCodigo();
  }

  async ChekeoCodigo() {
    const alert = await this.alertController.create({
      header: 'Verificación',
      message: 'Ingresa el código enviado a tu celular',
      cssClass: 'AlertaVerificacion',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Código',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            const codigo = data.codigo;

            // Verificar si el código es "56789"
            if (codigo === this.codigoAsignado) {
              this.mostrarToast('Codigo ingresado correcto','success');
              // Redirige a otra página aquí usando Router
              this.router.navigate(['/QrAlumnoLectura']); // Reemplaza '/listadoCursoDocente' con la ruta deseada
            } else {
              this.mostrarToast('Error al enviar el SMS.','danger');
              // Mostrar un mensaje de error o realizar alguna otra acción
              // Puedes crear otro alert o mostrar un mensaje en la interfaz de usuario
            }
          }
        }
      ]
    });

    await alert.present();
  }
  // Metodo avisos
  async mostrarToast(mensaje: string, color: 'success' | 'warning' | 'danger' | 'primary' | 'secondary' = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,          // Mensaje a mostrar
      duration: 2000,            // Duración en milisegundos
      position: 'top',        // Posición del toast: 'top', 'bottom', o 'middle'
      color: color               // Color del toast
    });
    await toast.present();       // Muestra el toast
  }

  // ------------ VISUALIZACION DE CLASE EN PROCESO ------------------
  asignaturas: Observable<any[]>; // Cambia a un observable
  secciones: Observable<any[]>; // Cambia a un observable
  alumnos: Observable<any[]>; // Cambia a un observable
  horario: Observable<any[]>; // Cambia a un observable
  
  // Contiene todas las asignaturas del alumno
  vecesCombinadas: { 
    alumnoId: string, 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];
   
  // Contiene la asignatura en proceso para ALUMNO
  claseEnProceso: { 
    alumnoId: string, 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];
    
  // Contiene la asignatura en proceso para DOCENTE
  claseActualDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];
  // Contiene todas las asignaturas del DOCENTE
  claseProcesoDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];

   //Metodo todas asignaturas de un alumno
   claseEnProcesoAlumno() {
    this.asignaturas = this.hh.TodasLasAsignaturas();
    this.asignaturas.subscribe(asignaturas => {
      // Aquí empieza la iteración sobre los valores
      for (const asignatura of asignaturas) {
        // Asegúrate de que asignatura.id existe
        this.secciones = this.hh.SeccionesPorAsignatura(asignatura.id);
        this.secciones.subscribe(secciones => {
          // Aquí empieza la iteración sobre los valores
          for (const seccion of secciones) {
            // Asegúrate de que asignatura.id existe
            this.alumnos = this.hh.alumnoPorSeccion(asignatura.id, seccion.id);
            this.alumnos.subscribe(nombreAlumno => {
              // Aquí empieza la iteración sobre los valores
              for (const nombre of nombreAlumno) {
                // Asegúrate de que asignatura.id existe
                if (nombre.id === this.nombreUsuario) {
                  this.horario = this.hh.horarioAsignatura(asignatura.id, seccion.id);
                  this.horario.subscribe(horario => {
                    // Aquí empieza la iteración sobre los valores
                    for (const hora of horario) {
                      this.vecesCombinadas.push({
                        alumnoId: nombre.id,
                        asignaturaId: asignatura.id,
                        seccionId: seccion.id,
                        dia: hora.id,
                        horaInicio: hora["Hora Inicio"],
                        horaFin: hora["Hora Fin"]
                      });
                    }
                    // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
                    this.claseEnProcesoMetodo();
                  });
                }
              }
            });
          }
        });
      }
    });
  }
  
  
  // metodo que verifica el horario de asignatura y el sistema para los ALUMNOS 
  claseEnProcesoMetodo() {
    this.claseEnProceso = []; 
    for (const item of this.vecesCombinadas) {  
        if (this.hh.verificarHorario(item.dia,item.horaInicio,item.horaFin)) {
          this.claseEnProceso.push(item);
          this.asistenciaAlumnoService.claseActualAlumno.push(item);
        }
    }
  }
  
  
  


  

  
}
