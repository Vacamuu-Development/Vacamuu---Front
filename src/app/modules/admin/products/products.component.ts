import { Component, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent {
  constructor(private dialogService: DialogService) { }

  ref: DynamicDialogRef | undefined;

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
