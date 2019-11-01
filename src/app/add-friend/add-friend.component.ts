import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'add-friends',
  templateUrl: './add-friend.component.html'
})
export class AddFriendComponent implements OnInit {

  id: number;
  user: User;    // изменяемый объект
  loaded: boolean = false;

  constructor(private router: Router, activeRoute: ActivatedRoute, public http: HttpClient) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    //if (this.id)
    //  this.dataService.getProduct(this.id)
    //    .subscribe((data: Product) => {
    //      this.product = data;
    //      if (this.product != null) this.loaded = true;
    //    });


    let token = localStorage.getItem("jwt");
    this.http.get(`http://localhost:5000/api/user/getfriend/${this.id}`,
      {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      }).subscribe((response: User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });     
  }

  
}
