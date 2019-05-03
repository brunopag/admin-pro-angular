import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(data => {
      console.log('TERMINO! ', data);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador: number = 0;
      let interval = setInterval(() => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
