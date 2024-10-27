import { __decorate } from "tslib";
import { Component } from '@angular/core';
let QrAlumnoPage = class QrAlumnoPage {
    constructor(alertController, navCtrl, router, QRinfor) {
        this.alertController = alertController;
        this.navCtrl = navCtrl;
        this.router = router;
        this.QRinfor = QRinfor;
    }
    ngOnInit() {
    }
    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Verificación',
            message: 'Ingresa el código enviado a tu celular',
            cssClass: 'AlertaVerificacion',
            inputs: [
                {
                    name: 'codigo',
                    type: 'text',
                    placeholder: 'Código',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Confirmar',
                    handler: (data) => {
                        const codigo = data.codigo;
                        // Verificar si el código es "56789"
                        if (codigo === '56789') {
                            console.log('Código correcto');
                            // Redirige a otra página aquí usando Router
                            this.router.navigate(['/QrAlumnoLectura']); // Reemplaza '/listadoCursoDocente' con la ruta deseada
                        }
                        else {
                            console.log('Código incorrecto');
                            // Mostrar un mensaje de error o realizar alguna otra acción
                            // Puedes crear otro alert o mostrar un mensaje en la interfaz de usuario
                        }
                    }
                }
            ]
        });
        await alert.present();
    }
};
QrAlumnoPage = __decorate([
    Component({
        selector: 'app-qr-alumno',
        templateUrl: './qr-alumno.page.html',
        styleUrls: ['./qr-alumno.page.scss'],
    })
], QrAlumnoPage);
export { QrAlumnoPage };
//# sourceMappingURL=qr-alumno.page.js.map