import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string = '';
  profileCode: string = '';

  constructor() {}

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
