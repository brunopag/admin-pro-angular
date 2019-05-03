import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: any;

  imagenTemp: any = null;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  actualizarUsuario (usuario: Usuario) {
    // Modifico el usuario que obtuve del local storage y lo envio al servicio para que lo actualice
    this.usuario.nombre = usuario.nombre;
    // Si el usuario no es de google entonces se puede actualizar el email
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  // Se ejecuta cuando se selecciona un archivo en el formulario
  seleccionImagen( file: File ) {

    if ( !file ) {
      this.imagenSubir = null;
      return;
    }

    // Si el archivo no es una imagen
    if (file.type.indexOf('image') < 0 ) {
      swal('Solo Imagenes', 'Solo pueden seleccionarse archivos tipo imagen.', 'error');
      this.imagenSubir = null;
      return;
    }

    // Si el archivo es imagen, obtengo la url temporal para mostrarlo en el perfil antes de subirlo
    this.imagenSubir = file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
