import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit  {
  user: User;
 
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
    let token = localStorage.getItem("jwt");
    this.http.get("http://localhost:5000/api/customers/getidenti", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe((response : User)=> {
      this.user = response;
    }, err => {
      console.log(err)
    });
  }
}
