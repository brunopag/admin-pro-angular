import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {SettingsService, 
        SharedService, 
        SidebarService, 
        UsuarioService,
        LoginGuardGuard,
        UploadFileService,
        HospitalService,
        MedicoService,
        AdminGuard,
        VerificaTokenGuard} from '../services/services.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
