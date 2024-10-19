import { Component, OnInit,ChangeDetectionStrategy,signal } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/model/User';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { AsistenciaAlumnoService } from 'src/app/servicios/asistencia/asistencia-alumno.service';
import { LoginService } from 'src/app/servicios/inicio/login.service';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController,
    private navCtrl: NavController, public aa:LoginService
  ) { }
  
  hide = true; // Esta es una propiedad

  

  cuentas: any[] = [];

  usuario:String= ''
  contrasena:String= ''



  ngOnInit() {
  }




  validar() {
    this.aa.login(this.usuario, this.contrasena).subscribe(data => {
      this.cuentas = data;
  
      // Mueve la lógica que depende de cuentas aquí
      console.log(this.cuentas.length);
      if (this.cuentas.length > 0) {
        if (this.usuario === this.cuentas[0].Usuario && this.contrasena === this.cuentas[0].Contrasena) {
          console.log("Campos correctos de inicio de sesión");
          this.aa.nombreAlumno = this.cuentas[0].Nombre;
          this.aa.tipoUsuario = this.cuentas[0].Tipo;
          this.navCtrl.navigateForward("/home");
        } else {
        }
      } else {
        this.presentAlert();
      }
    }, error => {
      this.presentAlert();
    });
  }
  


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Inicio sesión',
      message: 'Usuario o Contraseña Incorrecta',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
