import { Component, signal, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../../@core/models/forms/login-form.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecoverPasswordComponent } from '../../admin/recover-password/recover-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {  
  isLoading = signal(false);
  
  loginForm: FormGroup<LoginForm>;
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          console.log('Login successful:', response);
          this.router.navigateByUrl('/home');
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
          console.log('Login error:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  ref: DynamicDialogRef | undefined;

  showRecoverPassword(){
    this.ref = this.dialogService.open(RecoverPasswordComponent ,{
      header: 'Recuperar contraseña',
      width: '50vw',
      modal:true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }
    
  
  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { 
    this.loginForm = this.authService.formLogin();
  }
}
