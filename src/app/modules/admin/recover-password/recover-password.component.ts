import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecoverPasswordComponent {
  ref: DynamicDialogRef | undefined;

  showConfirmCode(){
    this.ref = this.dialogService.open(ConfirmCodeComponent ,{
      header: 'Confirmar código',
      width: '50vw',
      modal:true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    })
  }

  constructor(private dialogService: DialogService,
    private messageService: MessageService
  ) { }
}
