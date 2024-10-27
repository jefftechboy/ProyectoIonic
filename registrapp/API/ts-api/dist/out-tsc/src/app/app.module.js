import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InformeModalModule } from './components/modulo/informe-modal/informe-modal.module'; // Importa el módulo, no el componente
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { QrCodeModule } from 'ng-qrcode';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [AppComponent], // Elimina la declaración de InformeModalComponent
        imports: [
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            InformeModalModule,
            QrCodeModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFirestoreModule,
            HttpClientModule,
        ],
        providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map