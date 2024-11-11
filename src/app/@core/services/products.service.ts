import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.api}/product`);
  }
}
