import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';


@Injectable()
export class DataService {

  private urlCustomers = "http://localhost:5000/api/customers";
  private urlProduct = "/api/products";

  constructor(private http: HttpClient) {
  }
  token = localStorage.getItem("jwt");
  getIdentiUser() {
    return this.http.get(this.urlCustomers + "/" + "getidenti", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      })
    }); 
  }
  
}
