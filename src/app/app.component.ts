import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // If encapsulation mode is set to 'shadow DOM' in 'app component', then navigation will stop working
  // encapsulation: ViewEncapsulation.ShadowDom
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }
}
