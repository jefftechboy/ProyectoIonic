import { Injectable } from '@angular/core';

import { Persona } from '../model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudpersonaService {

  constructor( private afs:AngularFirestore) { }


grabar(persona:Persona){
  return this.afs.collection('persona').add(persona);
}

listarTodo(): Observable<Persona[]>{
  return this.afs.collection<Persona>('persona').valueChanges({idField:'id'})
}

eliminar(id:any){
  return this.afs.collection('persona').doc(id).delete();
}

modificar(persona:Persona){
  return this.afs.collection('persona').doc(persona.id).update(persona)
}


}

