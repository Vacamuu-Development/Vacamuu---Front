import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getOrders(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api}/billing/client`, { headers });
  }

  getPDF(id: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.api}/billing/detail/` + id, { headers, responseType: 'blob' });
  }
}
