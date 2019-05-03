import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  hide: string = 'hide-modal';
  type: string;
  id: string;
  
  public notification = new EventEmitter<any>();

  constructor() { }

  showModal(type: string, id: string) {
    console.log(type);
    console.log(id);
    this.type = type;
    this.id = id;
    this.hide = '';
  }

  hideModal() {
    this.hide = 'hide-modal';
    this.type = '';
    this.id = '';
  }

}
