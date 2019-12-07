import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/user';


@Injectable()
export class DataService {

    

  private urlUser = "http://localhost:5000/api/user";
  private urlMessage = "http://localhost:5000/api/messages";
  private urlFile = "http://localhost:5000/api/file";
  
  constructor(private http: HttpClient) {
  }  
  // CustomersController
  getIdentiUser() {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "getidentity", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }); 
  }

  getAllUser() {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "getall", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  //UserController

  getFriend(id: number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "addfriend" +"/" + id , {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  deleteFriend(id: number) {
    let token = localStorage.getItem("jwt");
    return this.http.delete(this.urlUser + "/" + "deletefriend" + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  editIdentityUser(user: User) {

    return this.http.put(this.urlUser + "/" + "edit", user, {
      headers: new HttpHeaders({        
        "Content-Type": "application/json"
      })
    });
  }

  getUserForMessage(id:number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "getuserformessage" + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  getUserForProfile(id: number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "GetUserForProfile" + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  saveLike(likeid ) {
    let token = localStorage.getItem("jwt");
    return this.http.post(this.urlUser + "/" + "SaveLike", { likeid: likeid  }, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  getPosts( page: number, size: number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlUser + "/" + "GetAllPosts"  + "/" + page + "/" + size, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  saveUserPost(postText) {
    let token = localStorage.getItem("jwt");
    return this.http.post(this.urlUser + "/" + "SaveUserPost", { text: postText }, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  //MessageController
  saveMessage(id: number, message:string) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlMessage + "/" + "sevemessageasync" + "/" + id + "/" + message, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }

  getMessages(id: number, Friendid: number) {
    let token = localStorage.getItem("jwt");
    return this.http.get(this.urlMessage + "/" + "getmessagesasync" + "/" + id + "/" + Friendid, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    });
  }
  

  //FileController
  upladFile(id: number, formData:any ) {
    return this.http.post(this.urlFile + "/" + "UploadPhotoAsync" + "/" + id, formData, { reportProgress: true, observe: 'events' });
  }

  deletePhoto(id: number) {
    return this.http.delete(this.urlFile + "/" + "DeletePhotoAsync" + "/" + id);
  }

  upload(formData: any) {
    return this.http.post(this.urlFile + "/" + "Upload", formData, { reportProgress: true, observe: 'events' });
  }
}
