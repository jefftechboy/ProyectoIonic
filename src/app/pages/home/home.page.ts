import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Cerrar',
      role: 'confirm',
      handler: () => {
        this.menuController.close('end');
        this.navController.navigateForward("/login");
      },
    },
  ];














  usuario: string = '';
  profileCode: string = '';

  constructor(
    private router: Router,
    private menuController: MenuController,
    private navController: NavController,
  ) {}

  navigateAndClose(path: string) {
    this.router.navigate([path]).then(() => {
      this.menuController.close('end'); // 'end' es el ID del menú, ajusta si es necesario
    });
  }
  ngOnInit(): void {
    // Recuperar el nombre de usuario
    const storedUser = localStorage.getItem('userLogin');
    if (storedUser) {
      const userLogin = JSON.parse(storedUser);
      this.usuario = userLogin.username || '';
      this.profileCode = userLogin.profile?.code || '';
    }
  }
  
}
