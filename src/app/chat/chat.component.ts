import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { User } from 'app/user';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/data.service';
import { GetMessages } from '../getMessages';

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

  page: number = 1;//Первая страница
  size: number = 5;//Количество строк на странице
  count: number;
  res: number;
  totalPage: number[] = [];//Общее количество страниц
  
  
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
    
    this._hubConnection.on('Receive', (dateTime: string, nick: string, receivedMessage: string) => {
      if (this.userForMessage.userName == nick || this.user.userName==nick) {
        const text = `${dateTime}: ${nick}: ${receivedMessage}`;
        this.messages.push(text);
      }      
    });      
  }

  public save() {
    this.dataService.saveMessage(this.id, this.message).subscribe(err => {
      console.log(err)
      });    
  }
  
  public getmessages() {
    this.dataService.getMessages(this.user.id, this.id, this.page, this.size).subscribe((response: GetMessages) => {
      this.messages = response.messages;
      this.count = response.count;
      this.res = Math.ceil(this.count / this.size);
      for (let i = 1; i <= this.res; i++) {
        this.totalPage.push(i);
      }
    }, err => {
      console.log(err)
    });
  }

  nextBut(num: number) {
    if (num < (this.totalPage.length) + 1) {
      this.dataService.getMessages(this.user.id, this.id, num, this.size).subscribe((response: GetMessages) => {
        this.messages = response.messages;
        }, err => {
          console.log(err)
        });
      this.page = num;
    }
  }

  //Предидущая страница
  prevButAndAll(numprev: number) {
    if (numprev > 0) {
      this.dataService.getMessages(this.user.id, this.id, numprev, this.size).subscribe((response: GetMessages) => {
        this.messages = response.messages;
        }, err => {
          console.log(err)
        });
      this.page = numprev;
    }
  }

  endpage(set: number) {

    this.dataService.getMessages(this.user.id, this.id, set, this.size).subscribe((response: GetMessages) => {
      this.messages = response.messages;
      }, err => {
        console.log(err)
      });
    this.page = set;
  }
}


