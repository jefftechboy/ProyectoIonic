import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-curso-docente-detalle',
  templateUrl: './listado-curso-docente-detalle.page.html',
  styleUrls: ['./listado-curso-docente-detalle.page.scss'],
})
export class ListadoCursoDocenteDetallePage implements OnInit {

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
