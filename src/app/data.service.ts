import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';


@Injectable()
export class DataService {

  private token = localStorage.getItem("jwt");  

  private urlCustomers = "http://localhost:5000/api/customers";
  private urlUser = "http://localhost:5000/api/user";
  
  constructor(private http: HttpClient) {
  }  
  // CustomersController
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

  //UserController

  getFriend(id:number) {
    return this.http.get(this.urlUser + "/" + "getfriend" +"/" + id , {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      })
    });
  }

  deleteFriend(id: number) {
    return this.http.delete(this.urlUser + "/" + "deletefriend" + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      })
    });
  }
}
