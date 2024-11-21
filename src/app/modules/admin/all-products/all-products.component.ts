import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { products } from '../../../@core/models/products.model';
import { ProductsService } from '../../../@core/services/products.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AllProductsComponent implements OnInit{
  products: products[] = [];
  filteredProducts: products[] = [];
  id: number = 0;
  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;
  

  constructor(private dialogService: DialogService, 
    private productsService: ProductsService, 
    private router: Router, 
    private messageService: MessageService,
  private authService: AuthService) { }

  ngOnInit(): void {
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

    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Products:', data);
        this.products = data.map((product: products) => {
          return {
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image || 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg',
            categoryId: product.categoryId
          }
        })
        this.showAllProducts();
        this.filteredProducts = this.products; // Inicialmente mostrar todos los productos
      },
      error: error => {
        console.log('Error:', error);
      }
    })
  }

  
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
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

  ref: DynamicDialogRef | undefined;

  filterProductsById(id: number): void {
    this.filteredProducts = this.products.filter(product => product.categoryId === id);
    console.log('Filtered products:', id);
    console.log('Filtered products:', this.filteredProducts);
  }

  showAllProducts(): void {
    this.filteredProducts = this.products;
  }

  
}
