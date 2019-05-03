import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _ajustes: SettingsService) {
  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarTema(tema: string, link: any) {
    this.agregarCheck(link);
    this._ajustes.guardarTema(tema);
  }

  agregarCheck(link: any) {
    let selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === this._ajustes.ajustes.tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
