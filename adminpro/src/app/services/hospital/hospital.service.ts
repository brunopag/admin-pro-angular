import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales( desde?: number ) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    console.log(url);

    return this.http.put(url, hospital).map(( resp: any ) => {
      // Se usa el map para obtener la respuesta desde el servicio y manejarla antes del suscribe
      let hospitalDB: Hospital = resp.hospital;
      
      swal('Hospital Actualizado', hospitalDB.nombre, 'success');
    });
  }

  borrarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).map(resp => {
      swal('Hospital borrado correctamente', 'El hospital ' + hospital.nombre + ' ah sido borrado correctamente', 'success');
      return true;
    });
  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).map((resp: any) => {
      return resp.hospitales;
    });
  }

  crearHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token;

    return this.http.post(url, hospital)
    .map( (resp: any) => {
      swal('Hospital Creado', hospital.nombre, 'success');
      return resp.hospital;
    } );

  }

  getHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).map((resp: any) => {
      return resp.hospital;
    });
  }

}
