import { Component, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss'
})
export class PaymentModalComponent implements OnInit{
  monto: number;
  montoBs: number;
  day: number;
  month: number;
  year: number;

  isLoading = signal(false);

  ngOnInit(){
    this.calculateBs();
    const currentDate = new Date();
    this.day = currentDate.getDate();
    this.month = currentDate.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    this.year = currentDate.getFullYear();
  }

  calculateBs(){
    this.montoBs = this.monto * 50;
  }

  payment(){
    setTimeout(() => {
      this.isLoading.set(true);
      this.messageService.add({severity:'success', summary:'Compra realizada', detail:'Gracias por su compra'});

    }
    , 1000);
  }

  constructor(private dialogConfing: DynamicDialogConfig, private messageService: MessageService) {
    this.monto = this.dialogConfing.data.monto;
  }
}
