import { Injectable } from '@angular/core';


import { Persona } from 'src/app/model/Persona';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable,combineLatest } from 'rxjs';
//Importaciones
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afs:AngularFirestore) { }

  public nombreAlumno:string=""
  public tipoUsuario:String=""

  login(nombreUsuario:String,contraseña:String){
    return this.afs.collection("Usuarios", ref => ref
      .where("Usuario", "==", nombreUsuario)
      .where("Contrasena", "==", contraseña)).valueChanges();
  }

  updatePasswordInFirestore(nombreUsuario: string, nuevaContrasena: string): Promise<void> {
    return this.afs.collection("Usuarios", ref => ref.where("Usuario", "==", nombreUsuario))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            doc.ref.update({ Contrasena: nuevaContrasena });
          });
        } else {
          console.error("No se encontraron usuarios con el nombre de usuario proporcionado.");
          throw new Error("Usuario no encontrado.");
        }
      })
      .catch(error => {
        console.error("Error al actualizar la contraseña en Firestore:", error);
        throw error;
      });
  }


}
