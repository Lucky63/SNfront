import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'delete-friends',
  templateUrl: './delete-friends.component.html'
})
export class DeleteFriendsComponent implements OnInit {

  id: number;    

  constructor(private router: Router, activeRoute: ActivatedRoute, public http: HttpClient) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    this.http.delete(`http://localhost:5000/api/user/deletefriend/${this.id}`,
      {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      }).subscribe(data => this.router.navigateByUrl("/friendslist"))
  }


}
