import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/services.index';

declare function init_plugins();
// Google api para el login con google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    // Cargo los init de google para login
    this.googleInit();
      // Si el recuerdame se activo
      this.email = localStorage.getItem('email') || '';
      if (this.email.length > 1) {
        this.recuerdame = true;
      }
  }

  // ---> Google login
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '804924682353-os46p5kobnsnmunftv7rvo48upkc4gvq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      // Llamo al servicio que va a ser el login llamando a nuestro backend
      this._usuarioService.loginGoogle( token ).subscribe( resp => {
        // Si todo ejecuto bien se ejecuta el suscribe, despues redirecciono al dashboard
        // En el servicio se guarda la data del usr en el localstorage y en las variables
        console.log(resp);
        // redireccion actualizando la pagina para que siga funcionando el template.
        window.location.href = '#/dashboard';
      } );

    } );
  }
  // ----> FIN Google login

  // ---> Login Normal
  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login(usuario, forma.value.recuerdame)
                        .subscribe(correcto => this.router.navigate(['/dashboard']));

    console.log(forma.valid);
    console.log(forma.value);
  }
  // ---> FIN Login Normal

}
