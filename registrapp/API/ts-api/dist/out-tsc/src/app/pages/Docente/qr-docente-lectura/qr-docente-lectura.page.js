import { __decorate } from "tslib";
import { Component } from '@angular/core';
let QrDocenteLecturaPage = class QrDocenteLecturaPage {
    constructor(navController, QRinfor, ds, hh) {
        this.navController = navController;
        this.QRinfor = QRinfor;
        this.ds = ds;
        this.hh = hh;
        this.temporizadorIniciado = false;
        this.datosAsignaturaDocente = [
            this.hh.asignaturaNombre,
            this.hh.seccionNombre,
            this.hh.dia,
            this.hh.horaInicio,
            this.hh.horaFin
        ];
        // Generar el arreglo en formato JSON
        this.datosAsignaturaJSON = JSON.stringify(this.datosAsignaturaDocente);
    }
    iniciarTemporizador() {
        this.tiempoRestante = 10; // 300 segundos (5 minutos)
        this.temporizadorIniciado = true;
        // Inicia el temporizador, se ejecuta cada 1 segundo
        this.intervalo = setInterval(() => {
            if (this.tiempoRestante > 0) {
                this.tiempoRestante--;
            }
            else {
                clearInterval(this.intervalo); // Detener el temporizador cuando llegue a 0
                this.temporizadorIniciado = false;
                this.navController.navigateForward('/listAsisTomada');
            }
        }, 1000);
    }
    // Método para convertir los segundos restantes a formato MM:SS
    get tiempoFormateado() {
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }
    ngOnInit() {
        this.iniciarTemporizador();
    }
};
QrDocenteLecturaPage = __decorate([
    Component({
        selector: 'app-qr-docente-lectura',
        templateUrl: './qr-docente-lectura.page.html',
        styleUrls: ['./qr-docente-lectura.page.scss'],
    })
], QrDocenteLecturaPage);
export { QrDocenteLecturaPage };
//# sourceMappingURL=qr-docente-lectura.page.js.map