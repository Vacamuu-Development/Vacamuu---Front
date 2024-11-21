import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from '../products/components/shopping-cart/shopping-cart.component';
import { products } from '../../../@core/models/products.model';
import { ProductsService } from '../../../@core/services/products.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  constructor(private dialogService: DialogService, 
    private productsService: ProductsService, 
    private messageService: MessageService, 
    private router: Router,
  private authService: AuthService) { }

  products: products[] = [];
  ref: DynamicDialogRef | undefined;
  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;

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
          }
        });
        // Mezclar productos y seleccionar los primeros 4
        this.products = this.shuffleArray(this.products).slice(0, 5);
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

    // Método para mezclar un array
    shuffleArray(array: any[]): any[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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

    saveProduct(product: products){
      if (this.checkAuthentication()) {
      let cart: products[] = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product saved to cart:', product);
      }
    }

   showShoppingCart() {
      if (this.checkAuthentication()) {
        this.ref = this.dialogService.open(ShoppingCartComponent ,{
            width: '50vw',
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
        });
      } 
    }
}
