import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit  {
  user: User;
  getPhotos: string = `http://localhost:5000/`;
  constructor(private dataService: DataService) { }
  

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
}
