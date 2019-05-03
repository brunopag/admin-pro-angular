import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donas',
  templateUrl: './grafico-donas.component.html',
  styles: []
})
export class GraficoDonasComponent implements OnInit {

  @ Input() doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @ Input() doughnutChartData: number[] = [350, 450, 100];
  @ Input() doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
