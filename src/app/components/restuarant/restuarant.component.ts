import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restuarant',
  templateUrl: './restuarant.component.html',
  styleUrls: ['./restuarant.component.scss'],
})
export class RestuarantComponent implements OnInit {
  
  @Input() restuarant: any;
  constructor() {}

  ngOnInit() {}

  getCuisine(cuisine) {
    return cuisine.join(',');
  }
}
