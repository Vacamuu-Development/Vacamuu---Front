import { Component, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { orderForm } from '../../../../../@core/models/forms/order-form.model';
import { ProductsService } from '../../../../../@core/services/products.service';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent implements OnInit{
  monto: number;
  montoBs: number;
  day: number;
  month: number;
  year: number;
  products: any[];

  orderForm: FormGroup<orderForm>;

  isLoading = signal(false);

  ngOnInit(){
    this.calculateBs();
    const currentDate = new Date();
    this.day = currentDate.getDate();
    this.month = currentDate.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    this.year = currentDate.getFullYear();

    const products = this.getProductsFromCart();
    this.orderForm.patchValue({ products });
  }

  ref: DynamicDialogRef | undefined;

  onSubmit(){
    this.isLoading.set(true);
    this.productService.sendOrder(this.orderForm.value).pipe(
      finalize(() => {
        console.log('Pedido:', this.orderForm.value);
        this.isLoading.set(false)}),
      tap(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('/home');
        this.messageService.add({
          severity: 'success',
          summary: 'registrado',
          detail: 'Pedido realizado correctamente',
        });
        localStorage.removeItem('cart');
      })
    ).subscribe();
  }

  getProductsFromCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.map((product: any) => product.id);
  }

  calculateBs(){
    this.montoBs = this.monto * 50;
  }

  payment(){
    setTimeout(() => {
      this.isLoading.set(true);
      this.messageService.add({severity:'success', summary:'Compra realizada', detail:'Gracias por su compra'});
    }
    , 1000);
  }

  constructor(private dialogConfing: DynamicDialogConfig, 
    private messageService: MessageService,
    private productService: ProductsService,
    private dialogRef: DynamicDialogRef,
    private router: Router){ 
    this.monto = this.dialogConfing.data.monto;
    this.orderForm = this.productService.orderForm();
  }
}
