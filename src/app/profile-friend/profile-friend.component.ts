import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { User } from 'app/user';


@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.css']
})
export class ProfileFriendComponent implements OnInit {

  id: number;
  user: User;
  constructor(activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    if (this.id !== NaN) {
      this.dataService.getUserForProfile(this.id)
        .subscribe((response: User) => {
          this.user = response;
        }, err => {
          console.log(err)
        });
    }
    

  }



}
