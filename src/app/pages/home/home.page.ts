import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario:string=''

  constructor() {}

  ngOnInit(): void {
    var x=localStorage.getItem("usuario")
    this.usuario=x ?? ''
  }

}
