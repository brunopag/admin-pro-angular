import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private _router: Router,
              private title: Title,
              private meta: Meta) {
    this.getRouter().subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        title: 'description',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getRouter() {
    return this._router.events.pipe(
      filter((evento) => {
        return evento instanceof ActivationEnd;
      }),
      filter((evento: ActivationEnd) => {
        return (evento.snapshot.firstChild === null);
      }),
      map((evento: ActivationEnd) => {
        return evento.snapshot.data;
      })
    );
  }

}
