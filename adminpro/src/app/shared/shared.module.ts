import { NgModule } from '@angular/core';
import { CommonModule } from '../../../node_modules/@angular/common';

// Router Module
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
})
export class SharedModule { }
