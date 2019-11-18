import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  header: string = "Social Network <<Rabbit>>";
  constructor(private jwtHelper: JwtHelper) {
  }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
  }
}  
