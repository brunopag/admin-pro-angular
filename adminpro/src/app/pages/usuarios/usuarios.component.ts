import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  totalRegistros: number;
  desde: number = 0;
  siguienteDisable: boolean = false;
  anteriorDisable: boolean = false;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notification.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  siguienteUsuarios() {

    this.desde = this.desde + 5;
    this.cargarUsuarios();
    
    if ((this.desde + 5) >= this.totalRegistros) {
      this.siguienteDisable = true;
    }

    console.log(this.desde);
    console.log((this.desde - 5) === 0);

    if ((this.desde - 5) < 0) {
      console.log('entro');
      this.anteriorDisable = true;
    } else {
      console.log('entro 2');
      this.anteriorDisable = false;
    }
  }

  anteriorUsuarios() {

    this.desde -= 5;
    this.cargarUsuarios();
    console.log(this.desde);

    if ((this.desde - 5) <= 0) {
      this.anteriorDisable = true;
    }
    if ((this.desde + 5) >= this.totalRegistros) {
      this.siguienteDisable = true;
    } else {
      this.siguienteDisable = false;
    }

  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe((data: any) => {
      console.log(data);
      this.totalRegistros = data.total;
      this.usuarios = data.usuarios;

      this.cargando = false;

      if ((this.desde + 5) >= this.totalRegistros) {
        this.siguienteDisable = true;
      }

      if ((this.desde - 5) < 0) {
        this.anteriorDisable = true;
      }
    });
  }

  buscarUsuarios( termino: string ) {
    this.cargando = true;
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
      console.log(this.usuarios);
    } );
  }

  borrarUsuario( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar el usuario', 'No puede borrarse a si mismo.', 'danger');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta por borrar el usuario: ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.borrarUsuario(usuario).subscribe(resp => {
          this.cargarUsuarios();
        });
      } 
    });

  }

  actualizarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }

  showUploadModal( usuario: Usuario ) {
    this._modalUploadService.showModal('usuarios', usuario._id);
  }

}
