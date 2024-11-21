import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from '../products/components/shopping-cart/shopping-cart.component';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../@core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  user: string;
  isLoggedIn: boolean = false;
  userName: string;
  userLastName: string;
  dataOrders: any[] = [];
  idOrder: number;
  totalBs: number = 0;

  constructor(private authService: AuthService, 
    private router: Router,
     private messageService: MessageService, 
     private dialogService: DialogService,
    private orderService: OrderService) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      // Supongamos que el token contiene la información del usuario codificada en base64
      const user = JSON.parse(atob(token.split('.')[1]));
      this.userName = this.capitalizeFirstLetter(user.firstname || " ");
      this.userLastName = this.capitalizeFirstLetter(user.lastname || " ");
    }

    this.authService.getUser().pipe().subscribe({
      next: (user: any) => {
        this.user = user;
        console.log('User:', this.user);
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });

    this.orderService.getOrders().pipe().subscribe({
      next: (orders: any) => {
        this.dataOrders = orders;
        console.log('Orders:', this.dataOrders);
        this.calculateTotalBs();
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    })
  }

  calculateTotalBs(): void {
    this.totalBs = this.dataOrders.reduce((total, order) => total + (order.total * 50), 0);
  }

  
  getPDF(orderId: number): void {
    this.orderService.getPDF(orderId).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `order_${orderId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.log('Error:', error);
      }
    });
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  ref: DynamicDialogRef | undefined;

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Primero debes iniciar sesión' });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  showShoppingCart() {
    if (this.checkAuthentication()) {
      this.ref = this.dialogService.open(ShoppingCartComponent ,{
          width: '50vw',
          modal:true,
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
      });
    } 
  }
}
