import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,retry } from 'rxjs';
import { Persona } from '../model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CrudApiService {

  constructor(private http:HttpClient,private firestore: AngularFirestore) { }

  rutaapi = "https://jeffryzxc.pythonanywhere.com/api/seguridad/"

  getUsuarios():Observable<any>{
    return this.http.get(this.rutaapi).pipe(retry(3))
  }

 
  
}
