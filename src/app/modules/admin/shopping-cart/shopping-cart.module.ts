import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';



@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    ShoppingCartRoutingModule,
    CommonModule
  ]
})
export class ShoppingCartModule { }
