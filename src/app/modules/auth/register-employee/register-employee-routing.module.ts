import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmployeeComponent } from './register-employee.component';



const routes: Routes = [
  {
    path: '',
    component: RegisterEmployeeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEmployeeRoutingModule { }