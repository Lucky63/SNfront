import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { UserPost } from '../userPost';
import { Data } from '@angular/router';

@Component({
  selector: 'app-get-posts',
  templateUrl: './get-posts.component.html'
})
export class GetPostsComponent implements OnInit {
  user: User;
  posts: UserPost[];
  

  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.getIdentiUser()
      .subscribe((response: User) => {
        this.user = response;
        this.getPosts();
      }, err => {
        console.log(err)
      });
  }

  getPosts() {
    this.dataService.getPosts(this.user.id)
      .subscribe((response: UserPost[]) => {
        this.posts = response;
      }, err => {
        console.log(err)
      });
  }
}
