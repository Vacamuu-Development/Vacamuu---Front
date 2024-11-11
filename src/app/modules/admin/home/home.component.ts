import { Component, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from '../products/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
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
