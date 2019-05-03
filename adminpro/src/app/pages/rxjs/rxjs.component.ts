import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().pipe(retry(3))
    .subscribe(
      numero => console.log(numero),
      error => console.log('El observer tuvo un error', error),
      () => console.log('Termino!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se cerro pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador: number = 0;
      let interval = setInterval(() => {
          contador ++;
          let respuesta: any = {
            valor: contador
          };
          // if (contador === 4) {
          //   clearInterval(interval);
          //   observer.complete();
          // }

          observer.next(respuesta);
      }, 1000);
    }).pipe(
        // devuelvo el valor del objeto "respuesta"
        map(resp => {
          return resp.valor;
        }),
        // Devuelvo los impares
        filter((valor, index) => {
          if ( (valor % 2) === 1) {
            return true;
          } else {
            return false;
          }
        })
    );
  }

}
