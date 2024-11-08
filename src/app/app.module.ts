import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Toast, ToastModule } from 'primeng/toast';
import { LoaderModule } from './modules/shared/loader/loader.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { loaderAnimation } from './@core/utils/page-animation';
import { ProductsComponent } from './modules/admin/products/products.component';
import { ShoppingCartComponent } from './modules/admin/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AdminPanelComponent } from './modules/admin/admin-panel/admin-panel.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    LoaderModule,
    ProgressBarModule,
    CommonModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    DialogService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
