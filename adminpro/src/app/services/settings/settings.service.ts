import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '../../../../node_modules/@angular/platform-browser';


@Injectable()
export class SettingsService {

  ajustes: Ajuste = {
    tema: 'default',
    temaUrl: 'assets/css/colors/default.css'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarTema();
  }

  guardarTema(tema: string) {
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = 'assets/css/colors/' + tema + '.css';
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    this.aplicarTema(this.ajustes.temaUrl);
  }

  cargarTema() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.temaUrl);
    }
  }

  aplicarTema(url: string) {
    this._document.getElementById('tema').setAttribute('href', url);
  }

}

interface Ajuste {
  tema: string;
  temaUrl: string;
}
