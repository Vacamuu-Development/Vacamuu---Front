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
    title: 'Iniciar Sesion'
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/auth/register/register.module').then(m => m.RegisterModule),
    title: 'Registro'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/admin/home/home.module').then(m => m.HomeModule),
    title: 'Inicio'
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/admin/products/products.module').then(m => m.ProductsModule),
    title: 'Productos'
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./modules/admin/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
    title: 'Panel administrativo'
  },
  {
    path: 'add-products',
    loadChildren: () => import('./modules/admin/add-products/add-products.module').then(m => m.AddProductsModule),
    title: 'Agregar productos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
