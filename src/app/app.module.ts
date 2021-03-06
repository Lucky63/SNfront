
import { AuthGuard } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtHelper } from 'angular2-jwt'
import { UploadComponent } from 'app/upload/upload.component';
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
import { ChatComponent } from 'app/chat/chat.Component';

import { AddPhotosComponent } from 'app/add-photos/add-photos.component';
import { GalleryComponent } from 'app/gallery/gallery.component';
import { DeletePhotoComponent } from 'app/delete-photo/delete-photo.component';
import { ProfileComponent } from 'app/profile/profile.component';
import { ProfileFriendComponent } from 'app/profile-friend/profile-friend.component';
import { ProfileAllUsersComponent } from 'app/profile-allusers/profile-allusers.component';

import { PostComponent } from 'app/post/post.component';
import { GetPostsComponent } from 'app/get-posts/get-posts.component';
import { LikeComponent } from 'app/like/like.component';




import { DataService } from './data.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CustomersComponent,
    AppComponent, RegistrComponent, HeaderComponent, EditUserComponent, UserFormComponent,
    AllUsersComponent, AddFriendComponent, FriendsListComponent, DeleteFriendsComponent,
    ChatComponent, AddPhotosComponent, UploadComponent, GalleryComponent, DeletePhotoComponent,
    ProfileComponent, ProfileFriendComponent, ProfileAllUsersComponent, PostComponent, GetPostsComponent, LikeComponent],
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
      { path: 'allusers/addfriends/:id', component: AddFriendComponent },
      { path: 'friendslist', component: FriendsListComponent },
      { path: 'friendslist/delfriend/:id', component: DeleteFriendsComponent },
      { path: 'friendslist/chat/:id', component: ChatComponent },
      { path: 'addphotos', component: AddPhotosComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'gallery/deletephoto/:id', component: DeletePhotoComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'friendslist/profilefriend/:id', component: ProfileFriendComponent },
      { path: 'allusers/profileallusers/:id', component: ProfileAllUsersComponent },      
      { path: 'post', component: PostComponent },
      { path: 'get-posts', component: GetPostsComponent },
      { path: 'friendslist/profilefriend/:id/like/:id', component: LikeComponent },
      { path: 'like/:id', component: LikeComponent },
    ])
  ],
  providers: [JwtHelper, AuthGuard, DataService, ProfileFriendComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
