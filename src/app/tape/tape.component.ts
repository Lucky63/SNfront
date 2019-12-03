import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tape',
  templateUrl: './tape.component.html'
})
export class TapeComponent implements OnInit {
  user: User;
  messages: string[];
  constructor(private router: Router, private dataService: DataService) { }


  public createImgPath = (serverPath: string) => {
    return `http://localhost:5000/${serverPath}`;
  }

  ngOnInit() {
    this.dataService.getIdentiUser()
      .subscribe((response: User) => {
        this.user = response;
        this.uploadMessages();
      }, err => {
        console.log(err)
        });   
  }

  mess(message:string) {
    this.dataService.SaveFeedAsync(this.user.id, message).subscribe(data => this.router.navigateByUrl("tape"))   
  }

  uploadMessages() {
    this.dataService.GetMessagesFromTapes(this.user.id).subscribe((response: string[]) => {
      this.messages = response;
    }, err => {
      console.log(err)
    }); 
  }

}
