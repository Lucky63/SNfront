import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { GetUserFriendsViewModel } from 'app/getUserFriendsViewModel';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  friends: User[];

  id: number;
  page: number = 1;//Первая страница
  size: number = 5;//Количество строк на странице
  count: number;
  res: number;
  totalPage: number[] = [];//Общее количество страниц
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetIdentityUserId().subscribe((response: number) => {
      this.id = response;
      this.getfriends();
    }, err => {
      console.log(err)
    });
  }

  getfriends() {
    this.dataService.GetFriends(this.id, this.page, this.size)
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
      this.dataService.GetFriends(this.id, num, this.size)
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
      this.dataService.GetFriends(this.id, numprev, this.size)
        .subscribe((response: GetUserFriendsViewModel) => {
          this.friends = response.friends;
        }, err => {
          console.log(err)
        });
      this.page = numprev;
    }
  }

  endpage(set: number) {

    this.dataService.GetFriends(this.id, set, this.size)
      .subscribe((response: GetUserFriendsViewModel) => {
        this.friends = response.friends;
      }, err => {
        console.log(err)
      });
    this.page = set;
  }

}
