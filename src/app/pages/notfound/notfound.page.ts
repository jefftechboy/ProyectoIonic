import { Component, OnInit } from '@angular/core';

import {  ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
 
})

export class NotfoundPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;
 
  private animation: Animation;
  constructor(private animationCtrl: AnimationController,private navCtrl:NavController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.navCtrl.navigateForward(['/home']) 
    },3000)
  }
 
 
}
