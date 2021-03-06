import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { User } from 'app/user';
import { DataService } from '../data.service';


@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {  
  
  constructor(private router: Router, private dataService: DataService) {}
  user: User;
  invalidLogin: boolean;

  public response: { dbPath: '' };

  public uploadFinished = (event) => {
    this.response = event;
    this.user.avatarImgPath = this.response.dbPath;
  }

  ngOnInit() {   
    this.dataService.getIdentiUser()
      .subscribe((response: User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });     
  }

  edit() {    
    this.dataService.editIdentityUser(this.user)
      .subscribe(response => this.router.navigate(["/"]));    
  }
  
}
