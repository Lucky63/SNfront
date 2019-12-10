import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { DataService } from '../data.service';
import { Photos } from 'app/photos';
import { GetPhotosViewModel } from 'app/getPhotosViewModel';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  
})
export class GalleryComponent implements OnInit {
  album: Photos[];
  id: number;
  page: number = 1;//Первая страница
  size: number = 5;//Количество строк на странице
  count: number;
  res: number;
  totalPage: number[] = [];//Общее количество страниц

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.GetIdentityUserId().subscribe((response: number) => {
      this.id = response;
      this.getphotos();
    }, err => {
      console.log(err)
    });    
  }

  getphotos() {
    this.dataService.getUserPhotos(this.id, this.page, this.size)
      .subscribe((response: GetPhotosViewModel) => {
        this.album = response.photos;
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
      this.dataService.getUserPhotos(this.id, num, this.size)
        .subscribe((response: GetPhotosViewModel) => {
          this.album = response.photos;          
        }, err => {
          console.log(err)
        });
      this.page = num;
    }
  }

  //Предидущая страница
  prevButAndAll(numprev: number) {
    if (numprev > 0) {
      this.dataService.getUserPhotos(this.id, numprev, this.size)
        .subscribe((response: GetPhotosViewModel) => {
          this.album = response.photos;
        }, err => {
          console.log(err)
        });
      this.page = numprev;
    }
  }

  endpage(set: number) {

    this.dataService.getUserPhotos(this.id, set, this.size)
      .subscribe((response: GetPhotosViewModel) => {
        this.album = response.photos;
      }, err => {
        console.log(err)
      });
    this.page = set;
  }
}
