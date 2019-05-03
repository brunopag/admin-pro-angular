import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload/upload-file.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  token: string;
  usuario: Usuario;
  menu: any;

  constructor( public http: HttpClient, public router: Router, public _subirArchivoService: UploadFileService ) { 
    this.cargarStorage();
  }

  guardarStorage ( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id),
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ) );
    localStorage.setItem('menu', JSON.stringify( menu ) );

    this.token = token;
    this.usuario = usuario;
    this.menu = menu;

  }

  estaLogueado () {
    // Si existe token esta creado entonces esta logueado
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  } 

  loginGoogle ( token: string ) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
            .map((res: any) => {
              this.guardarStorage(res.id, res.token, res.usuario, res.menu);
              return true;
            })
            .catch(err => {
              console.log(err);
              swal('Error en el Login', err.error.mensaje, 'error');
              return Observable.throw(err);
            });

  }

  login(usuario: Usuario, recuerdame: boolean ) {
    let url = URL_SERVICIOS + '/login';

    // Si el recuerdame esta activado, guardo el email en el localStorage para obtenerlo despues
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    
    // Hago la peticion post del login y uso el map para obtener la respuesta y guardarla en el local storage
    return this.http.post(url, usuario)
                    .map((res: any) => {
                        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
                        return true;
                    })
                    .catch(err => {
                      // Obtengo el error desde el servidor y lo muestro en un mensaje
                      console.log(err);
                      swal('Error en el Login', err.error.message, 'error');
                      return Observable.throw(err);
                    });
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
                    .map((res: any) => {
                      this.token = res.token;
                      localStorage.setItem('token', this.token);
                    })
                    .catch(err => {
                      this.router.navigate(['/login']);
                      swal('Error renovando token', 'Realizar nuevamente el login', 'error');
                      return Observable.throw(err);
                    });
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    } );

  }

  actualizarUsuario (usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario).map(( resp: any ) => {
      // Se usa el map para obtener la respuesta desde el servicio y manejarla antes del suscribe
      let usuarioDB: Usuario = resp.usuario;

      if (usuario._id === this.usuario._id) {
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      
      swal('Usuario Actualizado', usuario.nombre, 'success');
    });
  }

  cambiarImagen (file: File, id: string) {
    // Llama al servicio para subir el archivo para el tipo usuarios
    this._subirArchivoService.uploadFile(file, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          console.log(this.usuario);
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);

          console.log(resp);
        })
        .catch(resp => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).map((resp: any) => {
      return resp.usuarios;
    });
  }

  borrarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.delete(url).map(resp => {
      swal('Usuario borrado correctamente', 'El usuario ' + usuario.nombre + ' ah sido borrado correctamente', 'success');
      return true;
    });
  }

}
