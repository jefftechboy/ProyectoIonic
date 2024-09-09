import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  username:string=''
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
        username: 'alan',
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
    let userLogin = listLogin.find(usr => usr.username === this.username && usr.password === this.password);

    if (userLogin) {
        console.log("Bienvenido");
        localStorage.setItem("usuario", this.username);
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
