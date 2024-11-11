import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsService } from '../../../@core/services/products.service';
import { products } from '../../../@core/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit{
  products: products[] = [];
  id: number = 0;
  
  

  constructor(private dialogService: DialogService, private productsService: ProductsService) { }

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
          }
        })
      },
      error: error => {
        console.log('Error:', error);
      }
    })
  }

  ref: DynamicDialogRef | undefined;

  saveProduct(product: products){
    let cart: products[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Product saved to cart:', product);
  }



  showShoppingCart() {
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
