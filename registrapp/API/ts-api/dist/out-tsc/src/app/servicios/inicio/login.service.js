import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let LoginService = class LoginService {
    constructor(afs) {
        this.afs = afs;
        this.nombreAlumno = "";
        this.tipoUsuario = "";
    }
    login(nombreUsuario, contraseña) {
        return this.afs.collection("Usuarios", ref => ref
            .where("Usuario", "==", nombreUsuario)
            .where("Contrasena", "==", contraseña)).valueChanges();
    }
    updatePasswordInFirestore(nombreUsuario, nuevaContrasena) {
        return this.afs.collection("Usuarios", ref => ref.where("Usuario", "==", nombreUsuario))
            .get()
            .toPromise()
            .then(querySnapshot => {
            if (querySnapshot && !querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    doc.ref.update({ Contrasena: nuevaContrasena });
                });
            }
            else {
                console.error("No se encontraron usuarios con el nombre de usuario proporcionado.");
                throw new Error("Usuario no encontrado.");
            }
        })
            .catch(error => {
            console.error("Error al actualizar la contraseña en Firestore:", error);
            throw error;
        });
    }
};
LoginService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map