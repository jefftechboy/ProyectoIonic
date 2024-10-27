import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
const routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
    },
    {
        path: 'intro',
        loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/Inicio/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'RecuperarContraseña',
        loadChildren: () => import('./pages/Inicio/reccontra/reccontra.module').then(m => m.ReccontraPageModule)
    },
    {
        path: 'listadoCursoDocente',
        loadChildren: () => import('./pages/Docente/listado-curso-docente/listado-curso-docente.module').then(m => m.ListadoCursoDocentePageModule)
    },
    {
        path: 'GenerarQrDocente',
        loadChildren: () => import('./pages/Docente/qr-docente/qr-docente.module').then(m => m.QrDocentePageModule)
    },
    {
        path: 'InformesCursoDocente',
        loadChildren: () => import('./pages/Docente/informe-docente/informe-docente.module').then(m => m.InformeDocentePageModule)
    },
    {
        path: 'listadoCursoAlumno',
        loadChildren: () => import('./pages/Alumno/lista-curso-alumno/lista-curso-alumno.module').then(m => m.ListaCursoAlumnoPageModule)
    },
    {
        path: 'listCurDocDetalle',
        loadChildren: () => import('./pages/Docente/listado-curso-docente-detalle/listado-curso-docente-detalle.module').then(m => m.ListadoCursoDocenteDetallePageModule)
    },
    {
        path: 'generarQrDocente',
        loadChildren: () => import('./pages/Docente/qr-docente-lectura/qr-docente-lectura.module').then(m => m.QrDocenteLecturaPageModule)
    },
    {
        path: 'listAsisTomada',
        loadChildren: () => import('./pages/Docente/lista-asistencia-tomada/lista-asistencia-tomada.module').then(m => m.ListaAsistenciaTomadaPageModule)
    },
    {
        path: 'QrAlumno',
        loadChildren: () => import('./pages/Alumno/qr-alumno/qr-alumno.module').then(m => m.QrAlumnoPageModule)
    },
    {
        path: 'QrAlumnoLectura',
        loadChildren: () => import('./pages/Alumno/qr-alumno-lectura/qr-alumno-lectura.module').then(m => m.QrAlumnoLecturaPageModule)
    }, {
        path: 'crudpersona',
        loadChildren: () => import('./pages/crudpersona/crudpersona.module').then(m => m.CrudpersonaPageModule)
    },
    {
        path: '**',
        loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map