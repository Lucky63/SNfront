import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'add-friends',
  templateUrl: './delete-photo.component.html'
})
export class DeletePhotoComponent implements OnInit {

  id: number;

  constructor(private router: Router, activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {

    this.dataService.deletePhoto(this.id)
      .subscribe(data => this.router.navigateByUrl("/gallery"))

  }



}
