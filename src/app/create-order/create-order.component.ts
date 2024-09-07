import { Component } from '@angular/core';
import { APIServiceComponent } from '../apiservice/apiservice.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  constructor(private apiService: APIServiceComponent, private router: Router) { }
  
  limit: any = 10;
  currentPage: any = 0;
  total_price: any = 0;
  totalPage:any =0
  listItems: any = [];
  listToppings: any = [];
  listOrderedItem: any = [];
  listToCreateOrder: any;
  AddItemisVisible: boolean = false;
  SumaryPopupVisible:boolean = false;
  selectedItem: any = {}; // To hold the selected item for the popup

  APIItem: any = this.apiService.ItemAPI();
  APITopping: any = this.apiService.ToppingAPI();
  APIOrder: any = this.apiService.OrderAPI();

  async ngOnInit(): Promise<void> {
    await this.APIItem.getAllItems(this.limit, this.currentPage).then((data: any) => {
      this.listItems = data.items;
      this.totalPage = Math.ceil(data.totalItems/this.limit)
    });
    await this.APITopping.getAllToppings(this.limit, this.currentPage, true).then((data: any) => {
      this.listToppings = data.toppings;
    });
  }

  OpenAddItemPopup(item: any) {
    this.selectedItem = item; // Set the selected item
    this.AddItemisVisible = true; // Show the popup
  }


  Submit(toppingID: any, description: any, quantity: any) {
    console.log(quantity);
    if (quantity < 1) {
      window.alert("Quantity is not correct!");
    } else {
      const selectedTopping = this.listToppings.find((topping: any) => topping.topping_id == toppingID);
      const selectedItem = this.selectedItem;
      this.listOrderedItem.push({
        item: selectedItem,
        topping: selectedTopping || { price: 0 },
        description: description,
        quantity: quantity,
        total_price: Number(Number((Number(selectedItem.price) + Number((selectedTopping || { price: 0 }).price)) * Number(quantity)).toFixed(2))
      });
      this.total_price += Number(Number((Number(selectedItem.price) + Number((selectedTopping || { price: 0 }).price)) * Number(quantity)).toFixed(2));
      this.ChangeAddItemisVisiblePopup();
    }
  }

  OrderSummaryInvisiblePopup(){
    this.SumaryPopupVisible = !this.SumaryPopupVisible
  }

  ChangeAddItemisVisiblePopup() {
    this.AddItemisVisible = !this.AddItemisVisible;
  }

  ConvertToNumber(text: any) {
    return Number(text);
  }

  RemoveItemInOrder(id: any, name: any) {
    if (window.confirm("Would you like to remove " + name + " ?")) {
      console.log();
      
      this.total_price -= this.listOrderedItem[id].total_price;
      this.listOrderedItem.splice(id, 1);
    }
  }

  CreateOrder() {
    const itemList = this.listOrderedItem.map((order: any) => ({
      item_id: order.item.item_id,
      quantity: order.quantity,
      price: order.item.price
    }));

    const toppingList = this.listOrderedItem
      .filter((order: any) => order.topping.topping_id != null)
      .map((order: any) => ({
        item_id: order.item.item_id,
        topping_id: order.topping.topping_id,
        quantity: order.quantity,
        price: order.topping.price
      }));

    this.listToCreateOrder = {
      status: 1,
      items: itemList,
      toppings: toppingList,
      total_price: this.total_price
    };
    console.log(this.listToCreateOrder);
    
    this.APIOrder.postCreateOrder(this.listToCreateOrder).then((data: any) => {
      if (data.code === 201) {
        window.alert("Success");
        this.router.navigate(['/order']);
      } else {
        window.alert("Error, Call dev");
      }
    });
  }
  GetItem(){
    this.APIItem.getAllItems(this.limit,this.currentPage,false).then((data:any)=>{
      this.totalPage = Math.ceil(data.totalItems/this.limit)
      this.listItems = data.items
    })
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
  ChangePage(next:boolean){
    if(next && this.currentPage < this.totalPage){
      this.currentPage++
      this.GetItem()
    }else if(!next && this.currentPage > 0){
      this.currentPage--
      this.GetItem()
    }
  }
}
