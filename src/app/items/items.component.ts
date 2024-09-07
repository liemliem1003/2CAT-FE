import { Component, OnInit } from '@angular/core';
import { APIServiceComponent } from '../apiservice/apiservice.component'

import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet,CommonModule,RouterLink],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit{
  constructor(private apiService: APIServiceComponent) { }

  listItem: any
  limit: any = 10
  currentPage: any = 0
  totalPage: any =0
  API: any = this.apiService.ItemAPI()

  ngOnInit(): void {
    this.GetItem()
  }

  GetItem(){
    this.API.getAllItems(this.limit,this.currentPage,false).then((data:any)=>{
      this.totalPage = Math.ceil(data.totalItems/this.limit)
      this.listItem = data.items
      
    })
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
