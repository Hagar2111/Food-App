import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  notFoundFullHeight: boolean = false;
  constructor(private _ActivatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.data[0]) {
      this.notFoundFullHeight = !this.notFoundFullHeight;
    }
  }

}
