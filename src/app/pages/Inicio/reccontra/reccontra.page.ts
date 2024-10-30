import { Injectable, Component,OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { CrudApiService } from 'src/app/servicios/crud-api.service';
@Component({
  selector: 'app-reccontra',
  templateUrl: './reccontra.page.html',
  styleUrls: ['./reccontra.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class ReccontraPage {
  usuario: string = "";
  nuevaContrasena: string = "";
  codigoSeguridad:string =''

  constructor(
    private toastController: ToastController,
    private loginService: LoginService,
    private alertController: AlertController,
    private CrudApiService:CrudApiService,
  ) {}


  OnInit(){
  }

  datoUsuario: any[]=[]


  limpiarCampos() {
    this.usuario = '';
    this.nuevaContrasena = '';
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }


  
  async mostrarAlert() {
    const alert = await this.alertController.create({
      header: 'Ingresa código personal Duoc',
      inputs: [
        {
          type: 'text',
          name: 'codigo', // Este 'name' se usa para capturar el valor ingresado
          placeholder: 'Código Duoc UC',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ingresar',
          handler: (alertData) => {
            if (this.nuevaContrasena == ""){
              this.presentAlertError3();
            }
            if(this.nuevaContrasena !== ""){
              const codigoIngresado = alertData.codigo; // Captura el valor del input
              this.loginService.SolicitudCodigoSeguridad(this.usuario).subscribe(data=>{
                this.datoUsuario = data;
                this.datoUsuario.forEach(element => {
                  if(element.Codigo === codigoIngresado){
                    /* DESARROLLO DE ACTUALIZAR CONTRASEÑA */
                      this.loginService.updatePasswordInFirestore(this.usuario, this.nuevaContrasena);
                      this.limpiarCampos();
                      this.mostrarToast('Contraseña actualizada correctamente, Vuelve a Ingresar.', 'success');                      
                      
                  }                 
                  else if(element.Codigo !== codigoIngresado){
                    this.presentAlertError();
                  }
                });
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }



  

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Codigo Incorrecto',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertError3() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Nueva contraseña no puede estar vacio',
      buttons: ['OK']
    });

    await alert.present();
  }



  ValidacionInputs(){
      if(this.usuario === "" ){
        console.log("Campo contraseña vacio")
        this.mostrarToast("Usuario Invalido","danger")
        return
      }
      if(this.nuevaContrasena === "" ){
        console.log("Campo contraseña vacio")
        this.mostrarToast("La nueva contraseña no puede ser vacio","danger")
        return
      }
      this.CodigoActualizacion();
  }


  async CodigoActualizacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar acción',
      message: 'Por favor, ingresa tu información.',
      inputs: [
        {
          name: 'inputField',
          type: 'text',
          placeholder: 'Escribe algo aquí...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log("Aca va algo")
            const inputFieldValue = data.inputField;
              this.CrudApiService.getUsuarios().subscribe(data=>{
                for (let datosApi of data) {
                  console.log("---------------------")
                  console.log(datosApi.Correo)
                  console.log(datosApi.CodigoSeguridad)
                  console.log(datosApi.CodigoSeguridad === inputFieldValue)
                  if (this.usuario === datosApi.Correo){
                    if (inputFieldValue !== datosApi.CodigoSeguridad){
                      this.presentAlertError();
                      return
                    }
                    if ( inputFieldValue === datosApi.CodigoSeguridad){
                      console.log("Codigo de seguridad correcto")
                      // VA ACTUALIZACION
                      console.log(datosApi.Correo, " = ", this.usuario)
                      this.loginService.updatePasswordInFirestore(this.usuario,this.nuevaContrasena);
                      this.mostrarToast("Contraseña actualizada correctamente","success");
                      this.limpiarCampos();
                      return
                    }
                  }
                }
              });
          }
        }
      ]
    });

    await alert.present();
  }



}