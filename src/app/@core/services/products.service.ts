import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { products } from '../models/products.model';
import { order } from '../models/order.model';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { orderForm } from '../models/forms/order-form.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;

  constructor(private http: HttpClient, private fb: NonNullableFormBuilder) { }

  getProducts() {
    return this.http.get(`${this.api}/product`);
  }

  addProducts(body: Partial<products>) {
    return this.http.post<products>(`${this.api}/product`, body);
  }

  orderForm(): FormGroup<orderForm>{
    const form: FormGroup<orderForm> = this.fb.group({
      products: new FormControl([]),
      address: new FormControl('', []),
    })
    return form;
  }

  sendOrder(body: Partial<order>){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<order>(`${this.api}/order`, body, { headers });
  }
}
