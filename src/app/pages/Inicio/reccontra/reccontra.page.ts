import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reccontra',
  templateUrl: './reccontra.page.html',
  styleUrls: ['./reccontra.page.scss'],
})
export class ReccontraPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  volver(){
    this.navCtrl.navigateForward(['/login'])
  }


}
