import { Component, signal, ViewEncapsulation } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from '../../../@core/services/products.service';
import { RegisterEmployeeForm } from '../../../@core/models/forms/registerEmployee-form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterEmployeeComponent {
  isLoading = signal(false);

  registerEmployeeForm: FormGroup<RegisterEmployeeForm>;

  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;

  constructor(private authService: AuthService, 
    private router: Router, 
    private messageService: MessageService) {
      this.registerEmployeeForm = this.authService.formRegisterEmployee();
    } 

  ngOnInit(): void{

    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      // Supongamos que el token contiene la información del usuario codificada en base64
      const user = JSON.parse(atob(token.split('.')[1]));
      this.userName = this.capitalizeFirstLetter(user.firstname || " ");
      this.userLastName = this.capitalizeFirstLetter(user.lastname || " ");
    }

    this.authService.getUser().pipe().subscribe({
      next: (user: any) => {
        this.user = user;
        console.log('User:', this.user);
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }

  onSubmit() {
    if (this.registerEmployeeForm.valid) {
      this.authService.registerEmployee(this.registerEmployeeForm.value).subscribe({
        next: response => {
          console.log('Register successful:', response);
          this.router.navigateByUrl('/login');
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario'});
          console.log('Register error:', error);
        }
      });
    } else {
      error: error => {
        console.log(error);
      }
      
    }
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Primero debes iniciar sesión' });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
