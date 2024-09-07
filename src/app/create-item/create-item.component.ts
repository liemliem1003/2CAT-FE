import { Component } from '@angular/core';
import { APIServiceComponent } from '../apiservice/apiservice.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent {
  constructor(private apiService: APIServiceComponent, private route: ActivatedRoute, private router: Router) { }
  item:any ={
    item_name:"",
    item_description: "",
    category:"",
    stock_quantity:0,
    price:0,
    status:true
  }
  API: any = this.apiService.ItemAPI()

  CreateNewItem(){
    console.log(this.item);
    this.API.postCreateNewItem(this.item).then((data:any)=>{
      if (data.code == 201) {
        window.alert("Success")
        this.router.navigate(['/items'])
      } else {
        window.alert("Error, Call dev")
      }
    })
  }
}
