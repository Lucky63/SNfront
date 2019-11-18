import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'add-friends',
  templateUrl: './add-friend.component.html'
})
export class AddFriendComponent implements OnInit {

  id: number;
  user: User;    // изменяемый объект
  loaded: boolean = false;

  constructor(private router: Router, activeRoute: ActivatedRoute, public http: HttpClient, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {
    
    this.dataService.getFriend(this.id)
      .subscribe(data => this.router.navigateByUrl("/"))

  }


  
}
