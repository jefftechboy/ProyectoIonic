import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InformeModalComponent } from './components/informe-modal/informe-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, InformeModalComponent], // Asegúrate de declarar tu componente aquí
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"registrapp-3f7ad","appId":"1:908342755261:web:ddbcdba2fc6502dbf71cd4","storageBucket":"registrapp-3f7ad.appspot.com","apiKey":"AIzaSyAehtOhLxGXPBoEXHpKOfvq0WfbrGvGx4w","authDomain":"registrapp-3f7ad.firebaseapp.com","messagingSenderId":"908342755261"})), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}

