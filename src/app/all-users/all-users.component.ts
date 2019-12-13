import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { GetUserFriendsViewModel } from 'app/getUserFriendsViewModel';

@Component({
  selector: 'all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  friends: User[];
  page: number = 1;//Первая страница
  size: number = 5;//Количество строк на странице
  count: number;
  res: number;
  totalPage: number[] = [];//Общее количество страниц

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getAllUser(this.page, this.size)
      .subscribe((response: GetUserFriendsViewModel) => {
        this.friends = response.friends;
        this.count = response.count;
        this.res = Math.ceil(this.count / this.size);
        for (let i = 1; i <= this.res; i++) {
          this.totalPage.push(i);
        }
    }, err => {
      console.log(err)
    });
  }

  nextBut(num: number) {
    if (num < (this.totalPage.length) + 1) {
      this.dataService.getAllUser(num, this.size)
        .subscribe((response: GetUserFriendsViewModel) => {
          this.friends = response.friends;
        }, err => {
          console.log(err)
        });
      this.page = num;
    }
  }

  //Предидущая страница
  prevButAndAll(numprev: number) {
    if (numprev > 0) {
      this.dataService.getAllUser(numprev, this.size)
        .subscribe((response: GetUserFriendsViewModel) => {
          this.friends = response.friends;
        }, err => {
          console.log(err)
        });
      this.page = numprev;
    }
  }

  endpage(set: number) {

    this.dataService.getAllUser(set, this.size)
      .subscribe((response: GetUserFriendsViewModel) => {
        this.friends = response.friends;
      }, err => {
        console.log(err)
      });
    this.page = set;
  }
}
