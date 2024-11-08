import { Component, signal, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../../@core/models/forms/login-form.model';

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
          this.router.navigateByUrl('/invoice/invoiceForm');
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

    
  
  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { 
    this.loginForm = this.authService.formLogin();
  }
}
