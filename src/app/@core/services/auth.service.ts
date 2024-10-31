import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/forms/login-form.model';
import { regsiterForm } from '../models/forms/register-form.model';

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

  formRegister(): FormGroup<regsiterForm>{
    const form: FormGroup<regsiterForm> = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })
    return form;
  }
}
