import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  desde: number = 0;
  medicos: Medico[] = [];
  totalRegistros: number = 0;

  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe((data: any) => {
      this.medicos = data.medicos;
      this.totalRegistros = data.total;
      console.log(this.medicos);
    });
  }

  buscarMedicos(termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedico(termino).subscribe(data => {
      this.medicos = data;
    });
  }

  borrarMedico( medico: Medico ) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta por borrar el medico: ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._medicoService.borrarMedico(medico).subscribe(resp => {
          this.cargarMedicos();
        });
      } 
    });

  }

}
