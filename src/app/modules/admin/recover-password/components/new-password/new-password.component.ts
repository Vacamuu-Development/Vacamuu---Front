import { Component, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecoverPasswordService } from '../../../../../@core/services/recover-password.service';
import { FormGroup } from '@angular/forms';
import { newPasswordForm } from '../../../../../@core/models/forms/newPassword-form.model';
import { MessageService } from 'primeng/api';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  isLoading = signal(false);

  code: string;

  ref: DynamicDialogRef | undefined;

  formNewPassword: FormGroup<newPasswordForm>;

  onSubmit() {
    this.isLoading.set(true);

    const formValue = { ...this.formNewPassword.value, code: this.code};
    this.recoverPasswordService.changePassword(formValue).pipe(
      finalize(() => {
        this.isLoading.set(false);
        this.ref.close();
      }),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'registrado',
          detail: 'Contraseña Cambiada correctamente',
        });
        this.rt.close();
        this.router.navigateByUrl('/login');
      })
    ).subscribe();
  }

  constructor(private recoverPasswordService: RecoverPasswordService,
    private rt: DynamicDialogRef,
    private messageService: MessageService,
    private router: Router,
    private dialogConfig: DynamicDialogConfig) {
    this.code = this.dialogConfig.data.code;
    this.formNewPassword = this.recoverPasswordService.newPassword();
  }
}
