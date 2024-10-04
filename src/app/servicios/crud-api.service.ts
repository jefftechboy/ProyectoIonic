import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,retry } from 'rxjs';
import { Persona } from '../model/Persona';
@Injectable({
  providedIn: 'root'
})
export class CrudApiService {

  constructor(private http:HttpClient) { }

  rutaapi = "https://jefftechboy.pythonanywhere.com/api/usuario/"

  getPersona():Observable<any>{
    return this.http.get(this.rutaapi).pipe(retry(3))
  }
}
