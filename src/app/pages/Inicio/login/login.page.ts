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

  nombre:string=''
  password:string=''

  ngOnInit() {
    let users: User[] = [
      {
        idUser:1,
        username: 'meko',
        password: '1234',
        profile: {
          id:1,
          code: 'profe',
          name: 'profesor'
        }
      },
      {
        idUser:2,
        username: 'dartel',
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
      header: 'Login',
      subHeader: 'Acceso al sistema agenda',
      message: 'Usuario o password incorrecto',
      buttons: ['Action'],
    });

    await alert.present();
  }
}
