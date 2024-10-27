import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
let CrudApiService = class CrudApiService {
    constructor(http, firestore) {
        this.http = http;
        this.firestore = firestore;
        this.rutaapi = "https://jefftechboy.pythonanywhere.com/api/usuario/";
    }
    getPersona() {
        return this.http.get(this.rutaapi).pipe(retry(3));
    }
};
CrudApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CrudApiService);
export { CrudApiService };
//# sourceMappingURL=crud-api.service.js.map