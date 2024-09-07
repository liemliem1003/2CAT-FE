import { Component } from '@angular/core';
import { APIServiceComponent } from '../apiservice/apiservice.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRgeneratorComponent } from '../qrgenerator/qrgenerator.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule,QRgeneratorComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  constructor(private apiService: APIServiceComponent, private route: ActivatedRoute, private router: Router, private qrcode: QRgeneratorComponent) { }
  AddItemisVisible: boolean = false
  orderID: any
  total_price: number =0
  listOrderedItem: any = []
  listItems: any = []
  listToppings: any = []
  orderInfo: any
  listToCreateOrder: any
  APIItem: any = this.apiService.ItemAPI()
  APITopping: any = this.apiService.ToppingAPI()
  APIOrder: any = this.apiService.OrderAPI()
  removedItemList:any = []
  removedToppingList:any = []

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.APIOrder.getOrderByID(params['orderID']).then(async (data: any) => {
        var order = data.order
        this.total_price = Number(order.total_price)
        this.orderID = order.order_id
        this.orderInfo = data
        console.log(this.orderInfo);
        
        for (let i = 0; i < data.items.length; i++) {
          this.listOrderedItem.push(
            {
              item: data.items[i],
              description: data.items[i].item_description,
              quantity: data.items[i].quantity,
              order_item_id: data.items[i].order_item_id,
              total_price: Number(data.items[i].price) * Number(data.items[i].quantity)
            }
          )

          for (let j = 0; j < data.toppings.length; j++) {
            if (data.items[i].item_id == data.toppings[j].item_id) {
              this.listOrderedItem[i].topping = data.toppings[j]
              this.listOrderedItem[i].total_price += Number(data.toppings[j].price) * Number(data.toppings[j].quantity)
              break
            }
          }

        }
      })
    })
    await this.APIItem.getAllItems(0, 0, true).then((data: any) => {
      this.listItems = data.items
    })

    await this.APITopping.getAllToppings(0, 0, true).then((data: any) => {
      this.listToppings = data.toppings
    })
  }
  ChangeAddItemisVisiblePopup() {
    this.AddItemisVisible = !this.AddItemisVisible;
  }
  RemoveItemInOrder(id: any, name: any) {
    if (window.confirm("Would you like to remove " + name + " ?")) {
      this.total_price -= this.NumberToFix(this.listOrderedItem[id].total_price)
      this.listOrderedItem[id].order_item_id ? this.removedItemList.push(this.listOrderedItem[id].order_item_id) : true
      if(this.listOrderedItem[id].topping!=undefined){
        this.listOrderedItem[id].topping.order_topping_id ? this.removedToppingList.push(this.listOrderedItem[id].topping.order_topping_id):true
      }
      console.log(this.listOrderedItem);
      console.log(this.removedToppingList);
      this.listOrderedItem.splice(id, 1)
    }
  }
  CloseOrder(id: any) {
    if (window.confirm("Would you like to close this order?")) {
      this.APIOrder.putCloseOrder(id).then((data: any) => {
        if (data.code == 201) {
          window.alert("Order was closed!!!")
          this.router.navigate(['/order'])
        } else {
          window.alert("Error, Call dev")
        }
      })
    }
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
      return number
    }
  }

  UpdateOrder() {
    this.total_price =0
    var orderList = this.listOrderedItem
    var itemList: any = []
    var toppingList: any = []
    for (let i = 0; i < orderList.length; i++) {
      this.total_price += this.NumberToFix(orderList[i].item.price)
      itemList[i] = {
        item_id: orderList[i].item.item_id,
        quantity: orderList[i].quantity,
        price: orderList[i].item.price,
        order_item_id: orderList[i].order_item_id
      }
      if (orderList[i].topping != null) {
        console.log(orderList[i].topping);
        this.total_price += this.NumberToFix(orderList[i].topping.price)
        toppingList[toppingList.length] = {
          item_id: orderList[i].item.item_id,
          topping_id: orderList[i].topping.topping_id,
          order_topping_id: orderList[i].topping.order_topping_id,
          quantity: orderList[i].quantity,
          price: orderList[i].topping.price
        }
      }

    }
    this.listToCreateOrder = {
      status: this.orderInfo.order.status,
      items: itemList,
      toppings: toppingList,
      total_price: this.total_price,
      removedItems:this.removedItemList,
      removedToppings:this.removedToppingList
    }
    console.log(this.listToCreateOrder);
    this.APIOrder.putUpdateOrder(this.orderID, this.listToCreateOrder).then((data: any) => {
      console.log(data);
      if (data.code == 201) {
        window.alert("Success")

        this.router.navigate(['/order'])
      } else {
        window.alert("Error, Call dev")
      }
    })
  }
  
  Submit(item: any, topping: any, description: any, quantity: any) {

    if (quantity < 1) {
      window.alert("Quantity is not correct!!!!!!!!!")
    } else {
      var seletctedItem = {
        price: 0,
      }
      var seletctedTopping = {
        price: 0,
      }
      if (item != null) {
        for (let i = 0; i < this.listItems.length; i++) {
          if (item == this.listItems[i].item_id) {
            seletctedItem = this.listItems[i]
          }
        }
      }
      if (topping != null) {
        for (let i = 0; i < this.listToppings.length; i++) {
          if (topping == this.listToppings[i].topping_id) {
            seletctedTopping = this.listToppings[i]
          }
        }
      }
      this.listOrderedItem[this.listOrderedItem.length] = {
        item: seletctedItem,
        topping: seletctedTopping,
        description: description,
        quantity: quantity,
        total_price: this.NumberToFix(((Number(seletctedItem.price) + Number(seletctedTopping.price)) * Number(quantity)))
      }
      this.total_price += this.NumberToFix((Number(seletctedItem.price) + Number(seletctedTopping.price)) * Number(quantity))
      this.ChangeAddItemisVisiblePopup()
    }
  }
}
