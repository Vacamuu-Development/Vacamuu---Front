import { Component, signal, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsForm } from '../../../@core/models/forms/products-form.model';
import { ProductsService } from '../../../@core/services/products.service';
import { finalize, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddProductsComponent {
  isLoading = signal(false);

  productForm: FormGroup<ProductsForm>;

  onSubmit() {
    this,this.isLoading.set(true);
    this.productService.addProducts(this.productForm.value).pipe(
      finalize(() => this.isLoading.set(false)),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'registrado',
          detail: 'Producto agregado correctamente',
        });

        this.router.navigateByUrl('/adminPanel');
      })
    )
  }

  constructor(private productService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) {}
}
