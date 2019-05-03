import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'path';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('se ejecuto guard verifica');
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );

    // Si expiro el token devuelvo false para que el guard no deje navegar
    if (this.expiroToken(payload.exp)) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaToken(payload.exp);
  }

  expiroToken(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaToken(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let ahora = new Date();
      let tokenExp = new Date(fechaExp * 1000);

      // Si falta 1 hora para que expire el token lo mando a renovar ;)
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() < ahora.getTime() ) {
        // Renuevo
        this._usuarioService.renuevaToken().subscribe(() => {
          console.log('token renovado');
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      } else {
        // No renuevo
        console.log('no es necesario renovar token ;)');
        resolve(true);
      }
    });
  }

}
