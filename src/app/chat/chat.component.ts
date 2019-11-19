import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { User } from 'app/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  constructor(private http: HttpClient, activeRoute: ActivatedRoute) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  private _hubConnection: HubConnection;
  id: number;
  user: User;  
  userForMessage: User;
 
  message:string = '';
  messages: string[] = [];
  
  bool: boolean = false;
  

  public sendMessage(): void {
    
    this._hubConnection
      .invoke('SendToAll', this.user.userName, this.message, this.userForMessage.userName)
      .then(() => this.message = '')
      .catch(err => console.error(err));
    this.save();
  }

  ngOnInit() {
    
    //this.nick = window.prompt('Your name:', 'John');
    let token = localStorage.getItem("jwt");
    //Получаем юзера, которому отправляем сообщение
    this.http.get(`http://localhost:5000/api/user/getuserformessage/${this.id}`
     ).subscribe((response: User) => {
       this.userForMessage = response;       
      }, err => {
        console.log(err)
        });

    //Юзер который отправляет сообщение
    this.http.get("http://localhost:5000/api/customers/getidenti", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe((response: User) => {
      this.user = response;
      this.getmessages();
    }, err => {
      console.log(err)
    });

    let hubUrl = 'http://localhost:5000/chat';
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })      
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('Receive', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });
        
       
  }




  public save() {
    let token = localStorage.getItem("jwt");
    this.http.get(`http://localhost:5000/api/messages/sevemessage/${this.id}/${this.message}`, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(err => {
      console.log(err)
      });    
  }
  
  public getmessages() {
    let token = localStorage.getItem("jwt");
    this.http.get(`http://localhost:5000/api/messages/getmessages/${this.user.id}/${this.userForMessage.id}`, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe((response: string[]) => {
      this.messages = response;
    }, err => {
      console.log(err)
    });
  }
}


