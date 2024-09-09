import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-codigocont',
  templateUrl: './codigocont.page.html',
  styleUrls: ['./codigocont.page.scss'],
})
export class CodigocontPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  
  volver(){
    this.navCtrl.navigateForward(['/RecuperarContraseña'])
  }
}
