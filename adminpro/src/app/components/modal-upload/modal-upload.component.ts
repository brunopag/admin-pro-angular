import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from './modal-upload.service';
import { UploadFileService } from '../../services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: any;
  imagenTemp: any = null;

  constructor(public _modalUploadService: ModalUploadService, public _subirArchivoService: UploadFileService) { }

  ngOnInit() {
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
    // Llama al servicio para subir el archivo para el tipo usuarios
    this._subirArchivoService.uploadFile(this.imagenSubir, this._modalUploadService.type, this._modalUploadService.id)
        .then((resp: any) => {

          this._modalUploadService.notification.emit(resp);
          this._modalUploadService.hideModal();
          swal('Imagen Actualizada', '', 'success');

          console.log(resp);
        })
        .catch(resp => {
          console.log(resp);
        });
  }

}
