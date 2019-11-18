import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';


@Injectable()
export class DataService {

  private token = localStorage.getItem("jwt");

  private urlCustomers = "http://localhost:5000/api/customers";
  private urlProduct = "/api/products";
  
  constructor(private http: HttpClient) {
  }  

  getIdentiUser() {
    return this.http.get(this.urlCustomers + "/" + "getidenti", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      })
    }); 
  }

  getAllUser() {
    return this.http.get(this.urlCustomers + "/" + "getall", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      })
    });
  }
  
}
