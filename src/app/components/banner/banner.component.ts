import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  slideOptions = {
    slidesPerView:1.1,
    initialSlide: 1,
    speed: 400,
    autoplay:true
}

@Input() bannerImages:any[];

  constructor() { }

  ngOnInit() {}

}
