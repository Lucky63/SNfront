import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  user: User;

  constructor(private router: Router, private dataService: DataService) { }


  public createImgPath = (serverPath: string) => {
    return `http://localhost:5000/${serverPath}`;
  }

  ngOnInit() {
    this.dataService.getIdentiUser()
      .subscribe((response: User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });
  }

  savePost(post: string) {
    this.dataService.saveUserPost(post).subscribe(data => this.router.navigateByUrl("/"))
  }
}
