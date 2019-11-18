import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'delete-friends',
  templateUrl: './delete-friends.component.html'
})
export class DeleteFriendsComponent implements OnInit {

  id: number;    

  constructor(private router: Router, activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    this.dataService.deleteFriend(this.id)
      .subscribe(data => this.router.navigateByUrl("/friendslist"))
  }


}
