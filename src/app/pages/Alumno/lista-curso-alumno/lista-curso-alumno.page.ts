import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-curso-alumno',
  templateUrl: './lista-curso-alumno.page.html',
  styleUrls: ['./lista-curso-alumno.page.scss'],
})
export class ListaCursoAlumnoPage implements OnInit {
  constructor() { }



  // Estado de cada dropdown
  dropdownStates = [false, false, false, false, false, false, false];

  // Define diferentes arrays para los ítems de cada dropdown
  itemsDropdowns = [
    ['Presente', 'Ausente', 'Presente', 'Presente', 'Ausente', 'Presente'],
    ['Ausente', 'Presente', 'Ausente', 'Presente', 'Presente', 'Ausente'],
    ['Presente', 'Presente', 'Ausente', 'Ausente', 'Presente', 'Presente'],
    ['Ausente', 'Presente', 'Presente', 'Ausente', 'Presente', 'Presente'],
    ['Presente', 'Ausente', 'Presente', 'Ausente', 'Presente', 'Ausente'],
    ['Ausente', 'Presente', 'Presente', 'Ausente', 'Presente', 'Presente'],
    ['Presente', 'Ausente', 'Presente', 'Ausente', 'Presente', 'Ausente']
  ];

  toggleDropdown(index: number) {
    this.dropdownStates[index] = !this.dropdownStates[index];
    for (let i = 0; i < this.dropdownStates.length; i++) {
      if (i !== index) {
        this.dropdownStates[i] = false;
      }
    }
  }





  ngOnInit() {
  }

}
