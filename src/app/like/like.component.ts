import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from '../data.service';
import { Location } from "@angular/common";
import { ProfileFriendComponent } from '../profile-friend/profile-friend.component';


@Component({
  selector: 'like',
  templateUrl: './like.component.html'
})
export class LikeComponent implements OnInit {

  id: number;

  constructor(private profile: ProfileFriendComponent ,private location: Location,private router: Router, activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {

    this.dataService.saveLike(this.id)
      .subscribe();
    this.location.back();    
  }


  


}
