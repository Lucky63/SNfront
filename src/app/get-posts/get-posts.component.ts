import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { UserPost } from '../userPost';
import { Data } from '@angular/router';
import { PostsViewModel } from 'app/postsViewModel';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-get-posts',
  templateUrl: './get-posts.component.html'
})
export class GetPostsComponent implements OnInit {
  user: User;
  posts: UserPost[];

  totalPage: number[] = [];//Общее количество страниц
  page: number = 1;//Первая страница
  size: number = 5;//Количество строк на странице
  

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
    this.dataService.getPosts( this.page, this.size,)
      .subscribe((response: PostsViewModel) => {
        this.posts = response.userPostViewModels;
        this.totalPage = response.totalPage;
      }, err => {
        console.log(err)
      });
  }

  nextBut(num: number) {
    if (num < (this.totalPage.length) + 1) {
      this.dataService.getPosts(num, this.size)
        .subscribe((response: PostsViewModel) => {
          this.posts = response.userPostViewModels;          
        }, err => {
          console.log(err)
        });
      this.page = num;
    }
  }

  //Предидущая страница
  prevButAndAll(numprev: number) {
    if (numprev > 0) {
      this.dataService.getPosts( numprev, this.size)
        .subscribe((response: PostsViewModel) => {
          this.posts = response.userPostViewModels;
        }, err => {
          console.log(err)
        });
      this.page = numprev;
    }
  }

  endpage(set: number) {

    this.dataService.getPosts( set, this.size)
      .subscribe((response: PostsViewModel) => {
        this.posts = response.userPostViewModels;
      }, err => {
        console.log(err)
      });
    this.page = set;
  }
}
