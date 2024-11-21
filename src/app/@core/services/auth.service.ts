import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from '../models/forms/login-form.model';
import { RegisterForm } from '../models/forms/register-form.model';
import { user } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient) { }

  formLogin(): FormGroup<LoginForm>{
    const form: FormGroup<LoginForm> = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
    return form;
  }

  public login(body: Partial<user>): Observable<user> {
    return this.http.post<user>(`${this.api}/auth/login`, body).pipe(
      tap(
        response => console.log("Current User:", response)
      )
    );
  }

  formRegister(): FormGroup<RegisterForm>{
    const form: FormGroup<RegisterForm> = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })
    return form;
  }
  
  public register(body: Partial<user>): Observable<user> {
    return this.http.post<user>(`${this.api}/auth/register`, body);
  }

  getUser(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<user>(`${this.api}/auth/profile`, { headers });
  }
}
