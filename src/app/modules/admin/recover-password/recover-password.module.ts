import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { InputOtpModule } from 'primeng/inputotp';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfirmCodeComponent,
    NewPasswordComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    StyleClassModule,
    InputOtpModule,
    ReactiveFormsModule
  ]
})
export class RecoverPasswordModule { }
