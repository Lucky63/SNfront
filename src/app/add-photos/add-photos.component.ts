import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { User } from 'app/user';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html'
})
export class AddPhotosComponent implements OnInit {
  public progress: number;
  public message: string;

  public user: User;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getIdentiUser()
      .subscribe((response: User) => {
        this.user = response;
      }, err => {
        console.log(err)
      });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let token = localStorage.getItem("jwt");
    this.http.post('http://localhost:5000/api/file/UploadPhoto/' + this.user.id, formData,  { reportProgress: true, observe: 'events'  })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
