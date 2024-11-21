import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOrdersRoutingModule } from './all-orders-routing.module';
import { AllOrdersComponent } from './all-orders.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    AllOrdersRoutingModule,
    TableModule
  ]
})
export class AllOrdersModule { }
