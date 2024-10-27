import { Injectable, Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/inicio/login.service';

@Component({
  selector: 'app-reccontra',
  templateUrl: './reccontra.page.html',
  styleUrls: ['./reccontra.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ReccontraPage {
  usuario: string;
  nuevaContrasena: string;

  constructor(
    private toastController: ToastController,
    private loginService: LoginService
  ) {}

  async actualizarContrasena() {
    if (!this.usuario || !this.nuevaContrasena) {
      this.mostrarToast('Por favor, completa todos los campos.', 'danger');
      return;
    }

    try {
      await this.loginService.updatePasswordInFirestore(this.usuario, this.nuevaContrasena);
      this.limpiarCampos();
      this.mostrarToast('Contraseña actualizada correctamente, Vuelve a Ingresar.', 'success');
    } catch (error) {
      this.mostrarToast('Error al actualizar la contraseña. Verifica los datos Ingresados.', 'danger');
    }
  }

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
}
