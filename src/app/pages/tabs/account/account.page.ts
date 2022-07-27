import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile: any = {};
  isLoading: boolean;
  orders:any[] = [];
  ordersSubscription: any;

  constructor(private orderService:OrderService) {}

  ngOnInit() {
    this.ordersSubscription = this.orderService.orders.subscribe(orders => {
      if(orders instanceof Array) {
        this.orders = orders;
      }
    });
    this.getData();
  }
 
 async getData() {
    this.isLoading = true;
    setTimeout(async () => {
      this.profile = {
        name: 'Gautam Sharma',
        phone: '8854082108',
        email: 'gautamsharma88540@gmail.com',
      };
      await this.orderService.getOrders();
      this.isLoading = false;
    }, 3000);
  }

  logout() {}

  reorder(order) {
    console.log(order);
  }

  getHelp(order) {
    console.log(order);
  }
  ngOnDestroy() {
    if(this.ordersSubscription) this.ordersSubscription.unsubscribe();
  }
}
