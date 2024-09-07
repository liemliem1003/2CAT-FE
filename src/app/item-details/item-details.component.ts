import { Component, OnInit} from '@angular/core';
import { APIServiceComponent } from '../apiservice/apiservice.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet,CommonModule,RouterLink,FormsModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit{
  constructor(private apiService: APIServiceComponent, private route: ActivatedRoute) { }
  isEdit:boolean = false
  item:any ={
    category:0,
    date_added:0,
    imagestring:0,
    item_description:0,
    item_id:0,
    item_name:0,
    price:0,
    stock_quantity:0,
    status:0
  }
 
  API: any = this.apiService.ItemAPI()

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.API.getItemByID(params['itemID']).then(async (data:any)=>{
        this.item = data[0]
      })
    })
  }

  Edit(){
    if(!this.isEdit){
      window.confirm("Click OK to Edit this" + this.item.item_name) ? this.isEdit = !this.isEdit : null
    }else{
      if (window.confirm("Confirm to update" + this.item.item_name)) {
        this.isEdit = !this.isEdit
        this.API.putUpdateItemByID(this.item.item_id,this.item )
        
      }
    }
  }
  UpdateStatus(){
    console.log(this.item);

    var text = !this.item.status? "Would you like to Activate this product?":"Would you like to Deactivate this product?"
    if(window.confirm(text)){
      this.item.status = !this.item.status
      console.log(this.item);
      this.API.putUpdateItemByID(this.item.item_id,{status:this.item.status})
    }
  }  
}
