import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoDocenteService {

  constructor() { }

  public nombreDocente:string="";
  public seccionDocente:string="";
  public asignaturaDocente:string="";
  guardarDatosAsignatura(asignaturaId: string, seccionId: string, profesor: string) {
    this.nombreDocente = profesor;
    this.seccionDocente = seccionId;
    this.asignaturaDocente = asignaturaId;
  }



}
