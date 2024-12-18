import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsForm } from '../../../@core/models/forms/products-form.model';
import { ProductsService } from '../../../@core/services/products.service';
import { finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddProductsComponent implements OnInit{
  
  isLoading = signal(false);

  productForm: FormGroup<ProductsForm>;

  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private productService: ProductsService) {} 

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

  onSubmit() {
    this,this.isLoading.set(true);
    this.productService.addProducts(this.productForm.value).pipe(
      finalize(() => this.isLoading.set(false)),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'registrado',
          detail: 'Producto agregado correctamente',
        });

        this.router.navigateByUrl('/adminPanel');
      })
    )
  }
}
