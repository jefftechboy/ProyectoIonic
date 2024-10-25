import { Component, AfterViewInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';

@Component({
  selector: 'app-qr-alumno-lectura',
  templateUrl: './qr-alumno-lectura.page.html',
  styleUrls: ['./qr-alumno-lectura.page.scss'],
})
export class QrAlumnoLecturaPage implements AfterViewInit {
  private qrReader = new BrowserQRCodeReader();
  infoRecibida: any = ''
  constructor() {}

  ngAfterViewInit() {
    this.startScan();
  }

  startScan() {
    this.qrReader.decodeOnceFromVideoDevice(undefined, 'QR')
      .then(result => {
        console.log('Código QR:', result.getText());
        this.infoRecibida =  result;
        // Aquí puedes procesar el resultado, por ejemplo, guardarlo o mostrarlo en la interfaz
      })
      .catch(err => console.error('Error en el escaneo:', err));
  }
}
