import { Component, AfterViewInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../../Inicio/login/login.page';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { take } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-qr-alumno-lectura',
  templateUrl: './qr-alumno-lectura.page.html',
  styleUrls: ['./qr-alumno-lectura.page.scss'],
})
export class QrAlumnoLecturaPage implements AfterViewInit {
  private qrReader = new BrowserQRCodeReader();
  constructor(
    public ass:AsistenciaAlumnoService,
    private toastController: ToastController,
    private alertController: AlertController,
    private logi:LoginService,
    private nav:NavController
  ) {}
  
  ngAfterViewInit() {
    this.startScan();
    console.log(this.fechaActual);
    //Fecha actual
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = today.getFullYear();
    this.fechaActual = `${day}-${month}-${year}`;
  }
  clasesalum: any[]=[]
  public mismaAsignatura:boolean = false;
  public mismaSeccion:boolean = false;
  public mismoDia:boolean = false;
  public mismoHoraInicio:boolean = false;
  public mismoHoraFin:boolean = false;
  public fechaActual  = new Date().toLocaleDateString('es-ES');
  claseQueSeCambiara: any[] = [];
  startScan() {
    this.qrReader.decodeOnceFromVideoDevice(undefined, 'QR').then((result) => {
       // Parsear el JSON recibido de vuelta a un arreglo
      const datosRecibidos = JSON.parse(result.getText()) as string[];
      console.log("Chekeo de informacion de la clase")  
      // VERIFICAR QUE LOS DATOS ENTREGADOS QR CORRESPONDEN A LA CLASE EN PROCESO DEL ALUMNO
      datosRecibidos.forEach((dato, index) => {
        console.log(`Dato ${index + 1}: ${dato}`);
        // La asignatura no es la misma
        if (this.ass.claseActualAlumno[0].asignaturaId === dato) {
          this.mismaAsignatura = true;
          console.log("Es la misma asignatura")
        }
        // La Seccion no es la misma
        if (this.ass.claseActualAlumno[0].seccionId === dato) {
          this.mismaSeccion = true;
          console.log("Es la misma seccion")
        }
        // El dia no es la mismo
        if (this.ass.claseActualAlumno[0].dia === dato) {
          this.mismoDia = true;
          console.log("Es la misma dia")
        }
        // La hora de inicio no es la misma
        if (this.ass.claseActualAlumno[0].horaInicio === dato) {
          this.mismoHoraInicio = true;
          console.log("Es la misma hora de inicio")
        }
        // La hora fin es la misma
        if (this.ass.claseActualAlumno[0].horaFin === dato) {
          this.mismoHoraFin = true;
          console.log("Es la misma hora de fin")
        }
      });
      
      console.log("------------------CONTROL DE QUE TODA LA INFO ES LA MISMA------------------------")
      if(
         this.mismaAsignatura == true &&
         this.mismaSeccion == true &&
         this.mismoDia == true &&
         this.mismoHoraInicio == true &&
         this.mismoHoraFin == true
      
      ){
        // BUSCAR FECHA DEL DIA ( FORMATO =  DD/MM/YYYY )
        console.log(this.fechaActual);
        // BUSCAR ASISTENCIA ASGNADA PARA EL DIA DEL ALUMNO
        for (const detalleAsistencia of this.ass.claseActualAlumno) {
          this.ass.buscarAsistenciaRegistrar(
            detalleAsistencia.asignaturaId,
            detalleAsistencia.seccionId,
            this.logi.nombreAlumno,
          ).pipe(take(1)).subscribe(data=>{
            this.clasesalum = data;
            for (const asistenciaDoc of this.clasesalum) {
              console.log(asistenciaDoc.id)
              if (asistenciaDoc.Fecha.toDate().toLocaleDateString() === this.fechaActual) {
                console.log("ACA VA EL DESARROLLO DE EL CAMBIO DE ASISTENCIA")
                console.log("Esta es la clase donde se debe cambiar el estado",asistenciaDoc.id)
                this.ass.registrarAsentenciaPresente(
                  detalleAsistencia.asignaturaId,
                  detalleAsistencia.seccionId,
                  this.logi.nombreAlumno,
                  asistenciaDoc.id
                );
                this.mostrarToast('Asistencia registrada exitosamente', 'success');
                this.nav.navigateForward("/home")
                return;
              }
            }
          });};
      }
      /* ---------------  EVALUAR CUANDO NO SON LOS MISMOS DATOS --------------- */
      //No es tu asignatura
      if( this.mismaAsignatura == false ){
        console.log("No es la misma asignatura")
        this.mostrarToast('No estás inscrito en la asignatura en proceso', 'danger');
        this.nav.navigateForward("/home")
        return;
      }
      //No es tu seccion
      if( this.mismaSeccion == false ){
        console.log("No es la misma seccion")
        this.mostrarToast('No estás asignado a esta sección en la asignatura en proceso', 'danger');
        this.nav.navigateForward("/home")
        return;
      }
      //Estas fuera del horario de la asignatura
      if( this.mismoHoraInicio == false || this.mismoHoraFin == false || this.mismoDia == false){        
        console.log("No es la hora no esta entre")
        this.mostrarToast('Estas fuera del horario de la asignatura en proceso', 'danger');
        this.nav.navigateForward("/home")
        return;
      }




      })
  }



  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  async mostrarErrordeDatos(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

}
