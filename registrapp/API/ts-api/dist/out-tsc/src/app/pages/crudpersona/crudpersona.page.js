import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CrudpersonaPage = class CrudpersonaPage {
    constructor(cp, crud, tc) {
        this.cp = cp;
        this.crud = crud;
        this.tc = tc;
        this.persona = { nombre: '', apellido: '' };
        this.nueva_persona = { id: '', nombre: '', apellido: '' };
        this.lista_personas = [];
        this.sw = false;
        this.asignaturas = [];
        this.nombreBuscado = '';
    }
    ngOnInit() {
        this.listar();
    }
    async mensaje(texto) {
        const toast = await this.tc.create({
            message: texto,
            duration: 1000,
        });
        await toast.present();
    }
    modificar(persona) {
        this.nueva_persona = persona;
        this.sw = true;
    }
    actualizar() {
        this.cp.modificar(this.nueva_persona).then(() => {
            alert("Modificado");
            this.sw = false;
        }).catch((err) => {
            console.log(err);
        });
    }
    cancelar() {
        this.sw = false;
    }
    eliminar(id) {
        this.cp.eliminar(id).then(() => {
            alert("eliminado");
        }).catch((err) => {
            console.log(err);
        });
    }
    recuperar() {
        this.crud.getPersona().subscribe((any) => {
            console.log(any);
        });
    }
    listar() {
        this.cp.listarTodo().subscribe(data => {
            this.lista_personas = data;
        });
    }
    grabar() {
        this.cp.grabar(this.persona).then(() => {
            this.mensaje("grabo");
        }).catch((err) => {
            console.log(err);
        });
    }
    buscarAsignaturas() {
        this.cp.buscarAsignaturasPorNombre(this.nombreBuscado).subscribe(data => {
            this.asignaturas = data;
        }, error => {
            console.error('Error al buscar asignaturas: ', error);
        });
    }
};
CrudpersonaPage = __decorate([
    Component({
        selector: 'app-crudpersona',
        templateUrl: './crudpersona.page.html',
        styleUrls: ['./crudpersona.page.scss'],
    })
], CrudpersonaPage);
export { CrudpersonaPage };
//# sourceMappingURL=crudpersona.page.js.map