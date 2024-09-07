import { CommonModule } from '@angular/common';  
import { Component } from '@angular/core';

@Component({
  selector: 'app-table-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.scss'
})
export class TableDetailsComponent {
  
  AddItemisVisible: boolean = false;
  PaymentVisible: boolean = false;
  ChangeAddItemisVisiblePopup() {
    this.AddItemisVisible = !this.AddItemisVisible;
  }
  ChangePaymentVisiblePopup() {
    this.PaymentVisible = !this.PaymentVisible;
  }
}
