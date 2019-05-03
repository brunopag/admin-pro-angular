import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService, HospitalService } from '../../services/services.index';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico();
  hospitales: Hospital[] = [];
  hospital: Hospital;

  constructor(private activatedRoute: ActivatedRoute, 
              public _medicoService: MedicoService, 
              public _hospitalService: HospitalService,
              public roter: Router,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    // Obtengo el parametro de la ruta
    this.activatedRoute.params.subscribe(params => {
      let id: string = params['id'];
      // Si no es un nuevo Medico
      if ( id !== 'nuevo' ) {
        this._medicoService.getMedico(id).subscribe((medico: any) => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambiarHospital(this.medico.hospital);
        });
      }
    });

    this._modalUploadService.notification.subscribe(resp => {
      this.medico.img = resp.medico.img;
      console.log(this.medico);
    });
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      swal('Formulario no valido', 'Algunos campos son erroneos', 'warning');
      return;
    }
    
    this.medico.nombre = form.value.nombre;
    this.medico.hospital = form.value.hospital;

    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      this.medico = medico;
      this.roter.navigate(['/medico', medico._id]);
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  cambiarImagen() {
    this._modalUploadService.showModal('medicos', this.medico._id);
  }

  cambiarHospital(id: string) {
    this._hospitalService.getHospital(id).subscribe(hospital => {
      this.hospital = hospital;
    });
  }

}
