import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsService } from '../../../@core/services/products.service';
import { products } from '../../../@core/models/products.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit{
  products: products[] = [];
  filteredProducts: products[] = [];
  id: number = 0;
  

  constructor(private dialogService: DialogService, private productsService: ProductsService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
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

  saveProduct(product: products){
    if (this.checkAuthentication()) {
    let cart: products[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product saved to cart:', product);
    }
  }

  filterProductsById(id: number): void {
    this.filteredProducts = this.products.filter(product => product.categoryId === id);
    console.log('Filtered products:', id);
    console.log('Filtered products:', this.filteredProducts);
  }

  showAllProducts(): void {
    this.filteredProducts = this.products;
  }

  showShoppingCart() {
    if (this.checkAuthentication()) {
      this.ref = this.dialogService.open(ShoppingCartComponent ,{
          header: 'Carrito de compras',
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
