import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root' // This makes the service available globally
})

@Component({
  selector: 'app-apiservice',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './apiservice.component.html',
  styleUrl: './apiservice.component.scss'
})
export class APIServiceComponent {
  constructor(private http: HttpClient) {

  }
  httpRequest: any = this.http
  url = window.location.href
  private apiUrlInternal = 'http://localhost:3000';
  private apiUrlPublic = 'https://ffb7-2405-4800-5b0c-7f28-91d1-ae3d-5fd2-f578.ngrok-free.app';
  apiToken = "LIEMLIEM1003"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`,
      'ngrok-skip-browser-warning': 'true'
    })
  };
  ItemAPI() {
    const apiUrl = this.url.includes("localhost")?this.apiUrlInternal:this.apiUrlPublic
    const HTTPRequest = this.http;

    return {
      getAllItems: (limit: number, page: number, isGetAll: boolean) => {
        const api = `${apiUrl}/items?limit=${limit}&paging=${page}&isgetall=${isGetAll}`;
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      getItemByID: (id: number) => {
        const api = `${apiUrl}/items/${id}`;
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      putUpdateItemByID: (id: any, data: any) => {
        const api = `${apiUrl}/items/${id}`;
        return HTTPRequest.put(api, data, this.httpOptions).toPromise();
      },
      postCreateNewItem: (data: any) => {
        const api = `${apiUrl}/items`;

        return HTTPRequest.post(api, data, this.httpOptions).toPromise();
      }
    }
  }
  OrderAPI() {
    const apiUrl = this.url.includes("localhost")?this.apiUrlInternal:this.apiUrlPublic
    const HTTPRequest = this.http;
    return {
      getAllOrders: (limit: number, page: number) => {
        const api = `${apiUrl}/orders?limit=${limit}&paging=${page}`;
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      postCreateOrder:(orderData:any) =>{
        const api = `${apiUrl}/orders`;
        return HTTPRequest.post(api, orderData, this.httpOptions).toPromise();

      },
      getOrderByID:(id:any)=>{
        const api = `${apiUrl}/orders/${id}`;
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
      putUpdateOrder:(id:any,data:any)=>{
        const api = `${apiUrl}/orders/${id}`;
        return HTTPRequest.put(api, data, this.httpOptions).toPromise();
      },
      putCloseOrder:(id:any) =>{
        const api = `${apiUrl}/orders/close/${id}`
        return HTTPRequest.put(api,{}, this.httpOptions).toPromise();
      }
    }
      
  }

  ToppingAPI() {
    const apiUrl = this.url.includes("localhost")?this.apiUrlInternal:this.apiUrlPublic
    const HTTPRequest = this.http;
    return {
      getAllToppings: (limit: number, page: number, isGetAll: boolean) => {
        const api = `${apiUrl}/toppings?limit=${limit}&paging=${page}&isgetall=${isGetAll}`;
        return HTTPRequest.get(api, this.httpOptions).toPromise();
      },
    }
  }

}
