import { NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';


export class ApiService {
    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:3000/api';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    getAllItems(limit:any=10,page:any=0){
        var api = `${this.apiUrl}/items`
        console.log(api);
        return this.http.get<any>(api).toPromise();
    }


}