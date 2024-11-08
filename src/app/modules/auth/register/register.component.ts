import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterForm } from '../../../@core/models/forms/register-form.model';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  isLoading = signal(false);

  registerForm: FormGroup<RegisterForm>;

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: response => {
          console.log('Register successful:', response);
          this.router.navigateByUrl('/auth/login');
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario'});
        }
      });
    } else {
      error: error => {
        console.log(error);
      }
      
    }
  }

  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ){
    this.registerForm = this.authService.formRegister();
  }
}
