import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { User } from 'app/user';


@Component({
  selector: 'app-profile-all-users',
  templateUrl: './profile-allusers.component.html'
})
export class ProfileAllUsersComponent implements OnInit {

  id: number;
  user: User;
  constructor(activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {

    this.dataService.getUserForProfile(this.id)
      .subscribe((response: User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });

  }



}
