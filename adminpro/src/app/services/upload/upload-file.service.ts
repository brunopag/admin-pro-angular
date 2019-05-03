import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  uploadFile (file: File, type: string, id: string) {
    
    return new Promise((resolve, reject) => {
      // Codigo en vanilla javascript para subir archivos.. Se llama al servicio que creamos en backend.
      let formData = new FormData(); 
      let xhr = new XMLHttpRequest();
  
      formData.append('imagen', file, file.name);
  
      xhr.onreadystatechange = function() {
  
        if (xhr.readyState === 4) {
  
          if (xhr.status === 200 ) {
            console.log('Imagen Subida');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
  
      };

      let url = URL_SERVICIOS + '/upload/' + type + '/' + id;
      console.log(url);
      // Se configura el PUT del servicio de nuestro backend
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
    
  }

}
