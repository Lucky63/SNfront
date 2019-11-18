import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';

@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getAllUser()
      .subscribe((response: User[]) => {
      this.users = response;
    }, err => {
      console.log(err)
    });
  }
}
