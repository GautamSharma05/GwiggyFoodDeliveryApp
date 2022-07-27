import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { ApiService } from 'src/app/services/api/api.service';

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

  restaurants: any[] = [];
  categories: any[] = [];
  allItems: any[] = [];

  

  constructor(
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private route: Router,
    private api:ApiService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      this.restaurants = this.api.restaurants1;
      this.allItems = this.api.allItems;
      this.categories = this.api.categories;
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
