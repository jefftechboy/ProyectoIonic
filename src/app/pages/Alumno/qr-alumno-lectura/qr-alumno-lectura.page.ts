import { Component, AfterViewInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../../Inicio/login/login.page';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    private nav:NavController,
    private geolocation: Geolocation,

  ) {}
  
   async ngAfterViewInit() {
    await this.requestPermissions();
    await this.obtenerUbicacion();
    await this.startScan();

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = today.getFullYear();
    this.fechaActual = `${day}-${month}-${year}`;
  }

  async requestPermissions() {
    try {
       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
       if (!stream) {
           throw new Error('No se pudo acceder a la cámara.');
       }
       this.qrReader.decodeOnceFromStream(stream, 'QR').then(result => {
           console.log(result.getText());
       });
    } catch (error) {
       console.error('Error solicitando permisos:', error);
       this.mostrarToast('Se requieren permisos de cámara y geolocalización.', 'danger');
       this.nav.navigateBack('/home');
    }
 }
 

  clasesalum: any[]=[]
  public mismaAsignatura:boolean = false;
  public mismaSeccion:boolean = false;
  public mismoDia:boolean = false;
  public mismoHoraInicio:boolean = false;
  public mismoHoraFin:boolean = false;

  public latitudDocente: string = "";
  public longitudDocente: string = "";

  public latitudDocenteNum: number = parseFloat(this.latitudDocente);
  public longitudDocenteNum: number = parseFloat(this.longitudDocente);
  
  public latitudAlumno: number;
  public longitudAlumno: number;
  public distanciaEnMetros:number;


  public fechaActual  = new Date().toLocaleDateString('es-ES');
  claseQueSeCambiara: any[] = [];
  startScan() {
    this.qrReader.decodeOnceFromVideoDevice(undefined, 'QR').then((result) => {
       // Parsear el JSON recibido de vuelta a un arreglo
      const datosRecibidos = JSON.parse(result.getText()) as string[];
      console.log("Chekeo de informacion de la clase")  
      // VERIFICAR QUE LOS DATOS ENTREGADOS QR CORRESPONDEN A LA CLASE EN PROCESO DEL ALUMNO
      
      //OBTIENE GEOCALIZACION DEL DOCENTE
      this.latitudDocente = datosRecibidos[5]
      this.longitudDocente = datosRecibidos[6]
      console.log("DOCENTE Normal obtenido:")
      console.log("Latitud:",this.latitudDocente, " Tipo: ", typeof this.latitudDocente)
      console.log("Longitud:",this.longitudDocente, " Tipo: ",typeof this.longitudDocente)
      // Realiza la conversión aquí, después de haber establecido los valores
      this.latitudDocenteNum = parseFloat(this.latitudDocente);
      this.longitudDocenteNum = parseFloat(this.longitudDocente);
      console.log("DOCENTE transformado a number:")
      console.log("Latitud: ",this.latitudDocenteNum, " Tipo: ",typeof this.latitudDocenteNum)
      console.log("Longitud: ",this.longitudDocenteNum, " Tipo: ",typeof this.longitudDocenteNum)
      //OBTIENE GEOCALIZACION DEL ALUMNO
      /*
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitudAlumno = resp.coords.latitude;
        this.longitudAlumno = resp.coords.longitude;
      })
        */
      console.log("Alumno datos ")
      console.log("Latitud:",this.latitudAlumno, " Tipo: ",typeof this.latitudAlumno)
      console.log("Longitud: ",this.longitudAlumno, " Tipo: ",typeof this.longitudAlumno)
      // Metodo que busca los metros
      this.distanciaEnMetros = this.haversineDistance(
        this.latitudAlumno,
        this.longitudAlumno,
        this.latitudDocenteNum,
        this.longitudDocenteNum
      );
      console.log("Distancia entre dispositivos: ",this.distanciaEnMetros )

      console.log(datosRecibidos[5]);
      console.log(datosRecibidos[6]);
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
        // La hora fin es la misma
       
      });
      // Suponiendo que estas son tus coordenadas
      const latitudAlumno = -33.5813734;  // Reemplaza con la latitud del alumno
      const longitudAlumno = -70.6159555;  // Reemplaza con la longitud del alumno
      const latitudDispositivo = -33.58106284827759;  // Reemplaza con la latitud del dispositivo
      const longitudDispositivo = -70.61577839422709;  // Reemplaza con la longitud del dispositivo

      const distancia = this.haversineDistance(latitudAlumno, longitudAlumno, latitudDispositivo, longitudDispositivo);
      console.log("Distancia entre dispositivos: ", distancia);
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

  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude; 
      this.latitudAlumno = latitude;
      this.longitudAlumno = longitude;
      console.log(this.latitudAlumno);
      console.log(this.longitudAlumno);
    }
    )};

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
  calcularDistancia() {
    // Convierte las coordenadas del docente a número
    const latitudDocenteNum = parseFloat(this.latitudDocente);
    const longitudDocenteNum = parseFloat(this.longitudDocente);

    // Calcula la distancia
    this.distanciaEnMetros = this.haversineDistance(
      this.latitudAlumno,
      this.longitudAlumno,
      latitudDocenteNum,
      longitudDocenteNum
    );

    console.log(`La distancia entre el alumno y el docente es: ${this.distanciaEnMetros.toFixed(2)} metros`);
  }

  // Función para calcular la distancia utilizando la fórmula del Haversine
  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la Tierra en metros
      const φ1 = this.degreesToRadians(lat1);
      const φ2 = this.degreesToRadians(lat2);
      const Δφ = this.degreesToRadians(lat2 - lat1);
      const Δλ = this.degreesToRadians(lon2 - lon1);

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distancia en metros
  }
  degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}
