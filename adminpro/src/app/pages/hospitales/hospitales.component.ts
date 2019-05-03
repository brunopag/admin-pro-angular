import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  desde: number = 0;
  hospitales: Hospital[] = [];
  totalRegistros: number;

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notification.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  buscarHospitales(input: string) {
    console.log(input);
    if ( input.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(input).subscribe(data => {
      this.hospitales = data;
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales(this.desde).subscribe((data: any) => {
      this.hospitales = data.hospitales;
      this.totalRegistros = data.total;
      console.log(this.hospitales);
    });
  }

  showUploadModal( hospital: Hospital ) {
    this._modalUploadService.showModal('hospitales', hospital._id);
  }

  actualizarHospital ( hospital: Hospital ) {
    console.log(hospital);
    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta por borrar el hospital: ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._hospitalService.borrarHospital(hospital).subscribe(resp => {
          this.cargarHospitales();
        });
      } 
    });

  }

  crearHospital() {
    swal('Nombre de Hospital', {
      content: 'input',
    })
    .then((value) => {
      if (!value) {
        swal('No ingreso ningun nombre', 'Ingrese nombre de Hospital', 'warning');
        return;
      }

      let hospital = new Hospital(value);
      
      this._hospitalService.crearHospital(hospital).subscribe(resp => {
        swal('Hospital creado correctamente', resp.nombre, 'success');
        this.cargarHospitales();
      });

    });
  }

}
