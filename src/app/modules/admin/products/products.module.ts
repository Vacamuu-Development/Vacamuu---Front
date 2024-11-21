import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';





@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class ProductsModule { }
