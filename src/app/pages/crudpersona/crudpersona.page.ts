import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/Persona';
import { CrudpersonaService } from 'src/app/servicios/crudpersona.service';
import { CrudApiService } from 'src/app/servicios/crud-api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-crudpersona',
  templateUrl: './crudpersona.page.html',
  styleUrls: ['./crudpersona.page.scss'],
})
export class CrudpersonaPage implements OnInit {

  constructor(public cp:CrudpersonaService, public crud:CrudApiService) { }

  persona:Persona={nombre:'',apellido:''};
  nueva_persona:Persona={id:'',nombre:'',apellido:''};
  lista_personas:Persona[]=[]
  sw:boolean = false


  ngOnInit() {
    this.listar();
  }

  modificar(persona:Persona){
    this.nueva_persona= persona;
    
    this.sw=true
  }
  actualizar(){
    this.cp.modificar(this.nueva_persona).then(()=>{
      alert("Modificado")
      this.sw=false
    }).catch((err)=>{
      console.log(err)
    })
  }
  cancelar(){
    this.sw=false;
  }
  eliminar(id:any){
    this.cp.eliminar(id).then(()=>{
      alert("eliminado")
    }).catch((err)=>{
      console.log(err)
    })
  }


  recuperar(){
    this.crud.getPersona().subscribe(
      (any)=>{
        console.log(any)
      }
    )
  }

  listar(){
    this.cp.listarTodo().subscribe(data=>{
      this.lista_personas=data
    });
  }

  grabar(){
    this.cp.grabar(this.persona).then(()=>{
      alert("Grabo")
    }).catch((err)=>{
      console.log(err)
    })
  }

  
  

}
