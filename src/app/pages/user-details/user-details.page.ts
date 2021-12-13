import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserDetailsPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
