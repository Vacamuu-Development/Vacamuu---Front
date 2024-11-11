import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';




@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
