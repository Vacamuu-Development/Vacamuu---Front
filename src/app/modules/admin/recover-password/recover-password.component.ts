import { Component, signal, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { recoverPasswordForm } from '../../../@core/models/forms/recoverPassword-form.model';
import { FormGroup } from '@angular/forms';
import { RecoverPasswordService } from '../../../@core/services/recover-password.service';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RecoverPasswordComponent {
  isLoading = signal(false);

  ref: DynamicDialogRef | undefined;
  
  formRecoverPassword: FormGroup<recoverPasswordForm>;

  onSubmit(){
    this.isLoading.set(true);

    this.recoverPasswordService.sendEmail(this.formRecoverPassword.value).pipe(
      finalize(() => { 
        console.log(this.formRecoverPassword.value)
        this.isLoading.set(false)}),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Email enviado correctamente',
        });

        this.ref = this.dialogService.open(ConfirmCodeComponent ,{
          header: 'Introduce el código enviado a tu correo',
          width: '50vw',
          modal:true,
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
      });
      })
    ).subscribe();
  }

  constructor(private dialogService: DialogService,
    private messageService: MessageService,
    private recoverPasswordService: RecoverPasswordService
  ) { 
    this.formRecoverPassword = this.recoverPasswordService.recoverPassword();
  }
}
