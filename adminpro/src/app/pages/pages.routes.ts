import { Routes, RouterModule } from '../../../node_modules/@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dasboard'}, canActivate: [ VerificaTokenGuard ]},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Settings'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda General'}},
            // Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}, canActivate: [ AdminGuard ]},
            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
            {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
},
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
