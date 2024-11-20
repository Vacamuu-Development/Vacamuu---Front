import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { products } from '../../../../../@core/models/products.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { finalize } from 'rxjs';

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

  ref: DynamicDialogRef | undefined;

  showPaymentModal() {
      this.ref.close(),
      finalize(() => {
        this.ref = this.dialogService.open(PaymentModalComponent ,{
          header: 'Realiza tu pago movil aqui',
          width: '50vw',
          modal:true,
          data: {
            monto: this.totalProducts
          },
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
      });
      })

      
    }
  
  constructor(private dialogService: DialogService) {}
}
