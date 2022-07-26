import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput') sInput;
  isLoading: boolean;
  model:any ={
    icon:'search-outline',
    title:'No Restaurants Record Found',

  };
  query: any;
  allRestaurants: any = [
    {
      uid:'qdnjdvugdugvuggvuggug',
      cover: 'assets/images/1.jpg',
      name: 'Burger Farm',
      shortname: 'burger farm',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      delivery_time: 25,
      price: 100,
    },
    {
      uid:'qdnjdvugdugvuggauggug',
      cover: 'assets/images/2.jpg',
      name: 'Burger King',
      shortname: 'burger king',
      cuisines: ['Italian', 'Mexican'],
      rating: 4,
      delivery_time: 15,
      price: 200,
    },
    {
      uid:'qdnjdvugdugvuggbuggug',
      cover: 'assets/images/3.jpg',
      name: 'Burger Chacha',
      shortname: 'burger chacha',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      delivery_time: 10,
      price: 150,
    },
  ];

  restaurants:any = [];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  onSearchChange(event) {
    this.query = event.detail.value.toLowerCase();
    this.restaurants= [];
    if (this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async () => {
        this.restaurants = await this.allRestaurants.filter((element: any) => {
          return element.shortname.includes(this.query);
        });
        this.isLoading = false;
      }, 2000);
    }
    
  }
}
