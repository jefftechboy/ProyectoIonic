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
    private navCtrl: NavController
  ) { }
  
  hide = true; // Esta es una propiedad

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }



  nombre:string=''
  password:string=''

  ngOnInit() {
    let users: User[] = [
      {
        idUser:1,
        username: 'freddy',
        password: 'admin',
        profile: {
          id:1,
          code: 'profe',
          name: 'profesor'
        }
      },
      {
        idUser:2,
        username: 'robertito',
        password: '1234',
        profile: {
          id:2,
          code: 'alum',
          name: 'alumno'
        }
      }
  ];

    localStorage.setItem("users",JSON.stringify(users));
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.validar();
    }
  }

  validar() {
  
    let listLogin: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    let userLogin = listLogin.find(usr => usr.username === this.nombre && usr.password === this.password);

    if (userLogin) {
        console.log("Bienvenido");
        localStorage.setItem("usuario", this.nombre);
        localStorage.setItem("userLogin",JSON.stringify(userLogin));
        this.navCtrl.navigateForward(['/home']);
    } else {
        console.log("Usuario/Password Incorrecto");
        this.presentAlert();
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Inicio sesión',
      message: 'Usuario o contraseña incorrecto',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
