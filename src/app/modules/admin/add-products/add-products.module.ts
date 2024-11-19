import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductsComponent } from './add-products.component';
import { AddProductsRoutingModule } from './add-products-routing.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    InputTextareaModule,
    FileUploadModule
  ]
})
export class AddProductsModule { }
