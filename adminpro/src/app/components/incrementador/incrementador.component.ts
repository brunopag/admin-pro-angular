import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild ('txtProgress') txtProgress: ElementRef;
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() cambiarValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarProgreso(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;

    this.cambiarValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

  onChange ( newValue ) {
    // Esto es con Vanilla Javascript
    // let elemHTML: any = document.getElementsByName('progreso')[0];

    if (newValue > 100) {
      this.progreso = 100;
    } else if ( newValue < 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // Esto es con vanilla javascript
    // elemHTML.value = this.progreso;

    this.cambiarValor.emit(this.progreso);

    this.txtProgress.nativeElement.value = this.progreso;
  }

}
