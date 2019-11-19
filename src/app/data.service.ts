import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';


@Injectable()
export class DataService {

  private token = localStorage.getItem("jwt");  

  private urlCustomers = "http://localhost:5000/api/customers";
  private urlUser = "http://localhost:5000/api/user";
  private urlAuth = "http://localhost:5000/api/auth";
  
  constructor(private http: HttpClient) {
  }  
  // CustomersController
  getIdentiUser() {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlCustomers + "/" + "getidenti", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }); 
  }

  getAllUser() {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlCustomers + "/" + "getall", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  //UserController

  getFriend(id: number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "getfriend" +"/" + id , {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  deleteFriend(id: number) {
    let token = localStorage.getItem("jwt");
    return this.http.delete(this.urlUser + "/" + "deletefriend" + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  editIdentityUser(user: string) {

    return this.http.put(this.urlUser + "/" + "edit", user, {
      headers: new HttpHeaders({        
        "Content-Type": "application/json"
      })
    });
  }  
  
}
