import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChekeoEquipoService {
  private accountSid = 'ACe3a563fe0c5eca7fac95a14b45b31e38'; // Reemplaza con tu Account SID
  private authToken = 'b36bbe52b66643fa9edbe81746268639';   // Reemplaza con tu Auth Token
  private twilioPhoneNumber = '+15129829522'; // Tu número de Twilio
  constructor() { }

  public codigoEnviado:string;

  async sendSMS(to: string, body: string) {
    const data = new URLSearchParams();
    data.append('To', to);
    data.append('From', this.twilioPhoneNumber);
    data.append('Body', body);

    try {
        const response = await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`, 
          data, 
          {
            auth: {
              username: this.accountSid,
              password: this.authToken
            }
          }
        );

        // Guarda el ID del mensaje u otra información relevante
        const messageId = response.data.sid;
        this.codigoEnviado = response.data.sid;
        console.log('SMS enviado exitosamente, ID del mensaje:', messageId);

        // Retorna el ID del mensaje o cualquier otra información que necesites
        return messageId;
    } catch (error) {
        console.error('Error al enviar SMS:', error);
        return null;
    }
}

}
