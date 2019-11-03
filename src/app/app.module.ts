import { AuthGuard } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtHelper } from 'angular2-jwt'

import { HomeComponent } from 'app/home/home.component';
import { LoginComponent } from 'app/login/login.component';
import { CustomersComponent } from 'app/customers/customers.component';
import { AppComponent } from './app/app.component';
import { RegistrComponent } from 'app/registr/registr.component';
import { HeaderComponent } from 'app/header/header.component';
import { EditUserComponent } from 'app/edit-user/Edit-User.Component';
import { UserFormComponent } from 'app/user-form/user-form.Component';
import { AllUsersComponent } from 'app/all-users/all-users.Component';
import { AddFriendComponent } from 'app/add-friend/add-friend.Component';
import { FriendsListComponent } from 'app/friends-list/friends-list.Component';
import { DeleteFriendsComponent } from 'app/delete-friends/delete-friends.Component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CustomersComponent,
    AppComponent, RegistrComponent, HeaderComponent, EditUserComponent, UserFormComponent,
    AllUsersComponent, AddFriendComponent, FriendsListComponent, DeleteFriendsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'registr', component: RegistrComponent },
      { path: 'edit', component: EditUserComponent },
      { path: 'allusers', component: AllUsersComponent },
      { path: 'addfriends/:id', component: AddFriendComponent },
      { path: 'friendslist', component: FriendsListComponent },
      { path: 'friendslist/delfriend/:id', component: DeleteFriendsComponent },
    ])
  ],
  providers: [JwtHelper, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
