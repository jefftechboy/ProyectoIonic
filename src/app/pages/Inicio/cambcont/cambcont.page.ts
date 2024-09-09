import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambcont',
  templateUrl: './cambcont.page.html',
  styleUrls: ['./cambcont.page.scss'],
})
export class CambcontPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  volver() {
    this.navCtrl.navigateForward(['/codigocont'])
  }
}
