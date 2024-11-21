import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterEmployeeComponent } from './register-employee.component';
import { RegisterEmployeeRoutingModule } from './register-employee-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    RegisterEmployeeComponent
  ],
  imports: [
    CommonModule,
    RegisterEmployeeRoutingModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class RegisterEmployeeModule { }
