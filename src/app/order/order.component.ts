import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIServiceComponent } from '../apiservice/apiservice.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  constructor(private apiService: APIServiceComponent) { }
  listOrder: any
  limit: any = 10
  currentPage: any = 0
  totalPage: any = 0
  API: any = this.apiService.OrderAPI()

  ngOnInit(): void {
    this.GetOrder()
  }
  GetOrder() {
    this.API.getAllOrders(this.limit, this.currentPage).then((data: any) => {
      this.totalPage = Math.ceil(data.totalOrders / this.limit)
      this.listOrder = data.orders
      console.log(this.listOrder);
    })
  }
  CloseOrder(id: any) {
    if (window.confirm("Would you like to close this order?")) {
      this.API.putCloseOrder(id).then((data: any) => {
        if (data.code == 201) {
          window.alert("Order was closed!!!")
          location.reload();
        } else {
          window.alert("Error, Call dev")
        }
      })
    }
  }
  ChangePage(next: boolean) {
    if (next && this.currentPage < this.totalPage) {
      this.currentPage++
      this.GetOrder()
    } else if (!next && this.currentPage > 0) {
      this.currentPage--
      this.GetOrder()
    }
  }
  convertToDDMMYYYY(dateString:any) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  NumberToFix(number: any, addComma: boolean = false) {
    number = Number(Number(number).toFixed(2))
    if (addComma) {
      number = number.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(number))
        number = number.replace(pattern, "$1,$2");
      return number;
    } else {
      return Number(Number(number).toFixed(2))
    }
  }
}
