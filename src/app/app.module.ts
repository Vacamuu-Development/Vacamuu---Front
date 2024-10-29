import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { LoaderModule } from './modules/shared/loader/loader.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    ProgressBarModule,
    CommonModule,
    LoaderModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    DialogService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
