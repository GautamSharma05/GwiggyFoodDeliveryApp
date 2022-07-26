import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  id: any;
  data: any = {};
  items: any = [];
  isLoading: boolean;
  veg: boolean = false;
  cartData: any = {};
  storeData: any = {};
  model = {
    icon: 'fast-food-outline',
    title: 'No Menu Available Right Now',
  };
  restaurants = [
    {
      uid: 'qdnjdvugdugvuggvuggug',
      cover: 'assets/images/1.jpg',
      name: 'Burger Farm',
      address: 'BapuSapalya,Karnatak,INDIA',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      delivery_time: 25,
      price: 100,
      distance: 2.5,
    },
    {
      uid: 'qdnjdvugdugvuggauggug',
      cover: 'assets/images/2.jpg',
      name: 'Burger King',
      address: 'RaMurthiNagar,Karnatak,INDIA',
      cuisines: ['Italian', 'Mexican'],
      rating: 4,
      delivery_time: 15,
      price: 200,
      distance: 1.5,
    },
    {
      uid: 'qdnjdvugdugvuggbuggug',
      cover: 'assets/images/3.jpg',
      name: 'Burger Chacha',
      address: 'Bell Outlet,Karnatak,INDIA',
      cuisines: ['Italian', 'Mexican'],
      rating: 5,
      delivery_time: 10,
      price: 150,
      distance: 0.5,
    },
  ];
  categories: any[] = [
    {
      id: 'e00',
      name: 'Italian',
      uid: 'qdnjdvugdugvuggvuggug',
    },
    {
      id: 'e0',
      name: 'Mexican',
      uid: 'qdnjdvugdugvuggvuggug',
    },
  ];
  allItems = [
    {
      category_id: 'e00',
      cover: 'assets/images/pizza.jpg',
      desc: 'Great in taste,You fall in love with this definitely',
      id: 'i1',
      name: 'Pizza',
      price: 120,
      rating: 0,
      status: true,
      uid: 'qdnjdvugdugvuggvuggug',
      variation: false,
      veg: false,
    },
    {
      category_id: 'e0',
      cover: 'assets/images/salad.jpg',
      desc: 'Great in taste best in Bengaluru',
      id: 'i2',
      name: 'Caprese Salad',
      price: 200,
      rating: 0,
      status: true,
      uid: 'qdnjdvugdugvuggvuggug',
      variation: false,
      veg: true,
    },
    {
      category_id: 'e00',
      cover: 'assets/images/pasta.jpg',
      desc: 'Great in taste,You Love This food gwiggy assured',
      id: 'i3',
      name: 'Pasta',
      price: 150,
      rating: 0,
      status: true,
      uid: 'qdnjdvugdugvuggvuggug',
      variation: false,
      veg: true,
    },
  ];

  constructor(
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private route: Router
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      this.getItem();
    });
  }
  getCart() {
    return Storage.get({ key: 'cart' });
  }
  async getItem() {
    this.isLoading = true;
    this.data = {};
    this.cartData = {};
    this.storeData = {};
    setTimeout(async () => {
      let data: any = this.restaurants.filter((x) => x.uid === this.id);
      this.data = data[0];
      this.items = this.allItems.filter((x) => x.uid === this.id);
      this.categories = this.categories.filter((x) => x.uid === this.id);
      let cart: any = await this.getCart();
      if (cart?.value) {
        this.storeData = JSON.parse(cart.value);
        if (
          (this.id = this.storeData.restaurant.uid && this.allItems.length > 0)
        ) {
          this.allItems.forEach((element: any) => {
            this.storeData.items.forEach((ele) => {
              if (element.id != ele.id) return;
              element.quantity = ele.quantity;
            });
          });
        }
        this.cartData.totalItem = this.storeData.totalItem;
        this.cartData.totalPrice = this.storeData.totalPrice;
      }
      this.isLoading = false;
    }, 2000);
  }

  quantityPlus(index) {
    try {
      if (!this.items[index].quantity || this.items[index].quantity == 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  quantityMinus(index) {
    try {
      if (this.items[index].quantity !== 0) {
        this.items[index].quantity -= 1;
      } else {
        this.items[index].quantity = 0;
      }
      this.calculate();
    } catch (error) {
      console.log(error);
    }
  }

  calculate() {
    this.cartData.items = [];
    let item = this.items.filter((x) => x.quantity > 0);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach((element) => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice +=
        parseFloat(element.price) * parseFloat(element.quantity);
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if (this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
  }

  vegOnly(event) {
    this.items = [];
    if (event.detail.checked === true) {
      this.items = this.allItems.filter((x) => x.veg === true);
    } else {
      this.items = this.allItems;
    }
  }

  async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      await Storage.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async viewCart() {
    if (this.cartData.items && this.cartData.items.length > 0)
      await this.saveToCart();
    this.route.navigate([this.route.url + '/cart']);
  }
}
