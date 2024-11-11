import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { products } from '../../../../../@core/models/products.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit{
  cart: products[] = [];
  totalProducts: number = 0;

  ngOnInit(){
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log('Cart:', this.cart);
    this.calculateTotal();
  }

  calculateTotal(){
    this.totalProducts = this.cart.reduce((total, product) => total + product.price, 0);
  }
  
  constructor() {}
}
