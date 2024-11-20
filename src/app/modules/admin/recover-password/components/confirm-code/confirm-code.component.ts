import { Component, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewPasswordComponent } from '../new-password/new-password.component';
import { FormGroup } from '@angular/forms';
import { confirmCodeForm } from '../../../../../@core/models/forms/confirmCode-form.model';
import { RecoverPasswordService } from '../../../../../@core/services/recover-password.service';
import { finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrl: './confirm-code.component.scss'
})
export class ConfirmCodeComponent {
  isLoading = signal(false);

  code: string;

  formConfirmCode: FormGroup<confirmCodeForm>;

  ref: DynamicDialogRef | undefined;

  onSubmit(){
    this.isLoading.set(true);
    this.recoverPasswordService.checkCode(this.formConfirmCode.value).pipe(
      finalize(() => {
        console.log(this.formConfirmCode.value);
        this.isLoading.set(false)}),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registrado',
          detail: 'Código confirmado correctamente',
        });

        this.rt.close();

        this.ref = this.dialogService.open(NewPasswordComponent,{
          header: 'Introduce tu nueva contraseña',
          width: '50vw',
          modal:true,
          data:{
            code: this.formConfirmCode.value.code
          },
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
        });
      })
    ).subscribe();
  }

  constructor(private dialogService: DialogService, 
    private recoverPasswordService: RecoverPasswordService,
    private messageService: MessageService,
    private rt: DynamicDialogRef
  ) { 
    this.formConfirmCode = this.recoverPasswordService.confirmCode();
  }
}
