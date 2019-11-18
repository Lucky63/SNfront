import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  user: User;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getIdentiUser().subscribe((response: User) => {
      this.user = response;
    }, err => {
      console.log(err)
    });
  }
}
