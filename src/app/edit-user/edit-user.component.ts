import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'app/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {  
  
  constructor(private router: Router, activeRoute: ActivatedRoute, public http: HttpClient,) {}
  user: User;
  invalidLogin: boolean;
  ngOnInit() {   
    let token = localStorage.getItem("jwt");
    this.http.get("http://localhost:5000/api/user/getuser",
      {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      }).subscribe((response:User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });     
  }

  login(form: NgForm) {
    let user = JSON.stringify(form.value);
    this.http.put("http://localhost:5000/api/user/edit", user,
      {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
  
}
