import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos( desde: number ) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);
  }

  buscarMedico( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).map((resp: any) => {
      return resp.medicos;
    });
  }

  borrarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).map(resp => {
      swal('Medico borrado correctamente', 'El medico ' + medico.nombre + ' ah sido borrado correctamente', 'success');
      return true;
    });
  }

  getMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).map((resp: any) => {
      return resp.medico;
    });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    
    // Si viene id entonces es una actualizacion, sino un medico nuevo (uno es peticion put y otro post).
    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico).map((resp: any) => {
        swal('Medico actualizado', 'El medico ' + medico.nombre + ' se actualizo correctamente', 'success');
      return resp.medico;
      });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).map((resp: any) => {
        swal('Medico actualizado', 'El medico ' + medico.nombre + ' se actualizo correctamente', 'success');
        return resp.medico;
      });
    }

  }

}
