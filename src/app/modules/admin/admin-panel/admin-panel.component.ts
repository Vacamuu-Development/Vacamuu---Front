import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit{
  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {} 

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
