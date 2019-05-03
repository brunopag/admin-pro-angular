import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if ( !img ) {
      // Devuelve umagen por defecto
      return url + '/usuarios/zzz';
    }

    if ( img.indexOf('https') >= 0 ) {
      // es una imagen de google, img es la url de la imagen, la devuelvo
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        url += '/usuarios/zzz';
    }
    
    // Devuelvo la url de la imagen segun el tipo que sea
    return url;
  }

}
