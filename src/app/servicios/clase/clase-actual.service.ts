import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaseActualService {

  constructor() { }

  ClaseEnProceso(){
    
  }







  verificarHora(inputHora: string): boolean {
    // Suponiendo que el formato de inputHora es "HH:mm"
    const [horas, minutos] = inputHora.split(':').map(Number);
    
    // Crear un objeto Date con la hora ingresada
    const horaIngresada = new Date();
    horaIngresada.setHours(horas, minutos, 0, 0);
  
    // Obtener la hora actual del sistema
    const horaActual = new Date();
  
    // Comparar las horas
    return horaIngresada.getTime() === horaActual.getTime();
  }
  
  // Ejemplo de uso
 // const horaConsulta = "15:30"; // Cambia esto a la hora que deseas verificar
  // const esLaMismaHora = verificarHora(horaConsulta);
  // console.log(`¿Es la misma hora? ${esLaMismaHora}`);
  
  
}



