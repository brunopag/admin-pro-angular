import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService, public router: Router ) { }

  sonIguales ( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      // Si devuelve null entonces esta todo bien
      if ( pass1 === pass2 ) {
        return null;
      } 
      
      // Si no esta bien
      return {
        sonIguales: true
      };
    };

  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup ({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ) // Valor por defecto es false
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    this.forma.setValue({
      nombre: 'test1',
      correo: 'test1@asd.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal ('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
  
    let usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.correo,
        this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe( resp => {
      this.router.navigate(['/login']);
    });
    
  }

}
