import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { User } from 'app/user';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  constructor(activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
    
  }

  private _hubConnection: HubConnection;
  id: number;
  user: User;  
  userForMessage: User;
 
  message:string = '';
  messages: string[] = [];
  
  bool: boolean = false;
  dateTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  
  
  public sendMessage(): void {
    
    this._hubConnection
      .invoke('SendToAll', this.user.userName, this.message, this.userForMessage.userName, this.dateTime)
      .then(() => this.message = '')
      .catch(err => console.error(err));
    this.save();
    
  }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    //this.nick = window.prompt('Your name:', 'John');
    this.dataService.getUserForMessage(this.id).subscribe((response: User) => {
       this.userForMessage = response;       
      }, err => {
        console.log(err)
        });

    //Юзер который отправляет сообщение
    this.dataService.getIdentiUser().subscribe((response: User) => {
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

    this._hubConnection.on('Receive', (dateTime:string, nick: string, receivedMessage: string) => {
      const text = `${dateTime}: ${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });        
       
  }

  public save() {
    this.dataService.saveMessage(this.id, this.message).subscribe(err => {
      console.log(err)
      });    
  }
  
  public getmessages() {
    this.dataService.getMessages(this.user.id, this.id).subscribe((response: string[]) => {
      this.messages = response;
    }, err => {
      console.log(err)
    });
  }
}


