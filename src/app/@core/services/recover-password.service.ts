import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { recoverPasswordForm } from '../models/forms/recoverPassword-form.model';
import { confirmCodeForm } from '../models/forms/confirmCode-form.model';
import { newPasswordForm } from '../models/forms/newPassword-form.model';
import { recoverPassword } from '../models/recoverPassword.model';
import { confirmCode } from '../models/confirmCode.model';
import { newPassword } from '../models/newPassword.model';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {
  private api: string = environment.api;

  constructor(private http: HttpClient, private fb: NonNullableFormBuilder) { }

  recoverPassword(): FormGroup<recoverPasswordForm>{
    const form: FormGroup<recoverPasswordForm> = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
    return form;
  }

  confirmCode(): FormGroup<confirmCodeForm>{
    const form:  FormGroup<confirmCodeForm> = this.fb.group({
      code: new FormControl('')
    })
    return form;
  }

  newPassword(): FormGroup<newPasswordForm>{
    const form: FormGroup<newPasswordForm> = this.fb.group({
      code: new FormControl(''),
      password: new FormControl(''),
    })
    return form;
  }

  sendEmail(body: Partial<recoverPassword>){
    return this.http.post(`${this.api}/auth/forgot-password`, body);
  }

  checkCode(body: Partial<confirmCode>){
    return this.http.post(`${this.api}/auth/code-check`, body);
  }

  changePassword(body: Partial<newPassword>){
    return this.http.post(`${this.api}/auth/reset-password`, body);
  }
}
