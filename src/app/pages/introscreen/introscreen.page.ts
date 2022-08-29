import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introscreen',
  templateUrl: './introscreen.page.html',
  styleUrls: ['./introscreen.page.scss'],
})
export class IntroscreenPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(public router: Router) {}

  ngOnInit() {}
  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
