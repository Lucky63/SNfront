import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'like',
  templateUrl: './like.component.html'
})
export class LikeComponent implements OnInit {

  id: number;

  constructor(private router: Router, activeRoute: ActivatedRoute, private dataService: DataService) {
    this.id = Number.parseInt(activeRoute.snapshot.params["id"]);
  }

  ngOnInit() {

    this.dataService.saveLike(this.id)
      .subscribe(data => this.router.navigateByUrl("/"))

  }



}
