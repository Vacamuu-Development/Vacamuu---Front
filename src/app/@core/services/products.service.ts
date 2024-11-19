import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.api}/product`);
  }

  addProducts(body: Partial<products>) {
    return this.http.post<products>(`${this.api}/product`, body);
  }
}
