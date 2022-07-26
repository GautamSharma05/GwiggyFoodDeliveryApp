import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  banners: any[] = [];
  restaurants: any[] = [];
  isLoading:boolean=false;
  dummy = Array(10);

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [
        { banner: 'assets/images/1.jpg' },
        { banner: 'assets/images/2.jpg' },
        { banner: 'assets/images/3.jpg' },
      ];
      this.restaurants = [
        {
          uid:'qdnjdvugdugvuggvuggug',
          cover: 'assets/images/1.jpg',
          name: 'Burger Farm',
          cuisines: ['Italian', 'Mexican'],
          rating: 5,
          delivery_time: 25,
          price: 100,
          distance: 2.5,
        },
        {
          uid:'qdnjdvugdugvuggauggug',
          cover: 'assets/images/2.jpg',
          name: 'Burger King',
          cuisines: ['Italian', 'Mexican'],
          rating: 4,
          delivery_time: 15,
          price: 200,
          distance: 1.5,
        },
        {
          uid:'qdnjdvugdugvuggbuggug',
          cover: 'assets/images/3.jpg',
          name: 'Burger Chacha',
          cuisines: ['Italian', 'Mexican'],
          rating: 5,
          delivery_time: 10,
          price: 150,
          distance: .5,
        },
       
      ];
      this.isLoading =false;
    }, 2000);
   
    
  }
}
