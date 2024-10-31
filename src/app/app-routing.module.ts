import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule),
    title: 'Login'
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/auth/register/register.module').then(m => m.RegisterModule),
    title: 'Register'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/admin/home/home.module').then(m => m.HomeModule),
    title: 'Home'
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/admin/products/products.module').then(m => m.ProductsModule),
    title: 'Products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
