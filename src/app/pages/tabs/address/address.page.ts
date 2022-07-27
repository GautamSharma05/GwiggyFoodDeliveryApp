import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address/address.service';

import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit,OnDestroy {
  isLoading: boolean;
  addresses: any[] = [];
  addressesSubscription:Subscription;

  constructor(
    private addressService: AddressService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.addressesSubscription = this.addressService.addresses.subscribe(address => {
     
      if(address instanceof Array) {
        this.addresses = address;
      } else {
        if(address?.delete) {
          this.addresses = this.addresses.filter(x => x.id != address.id);
        } else if(address?.update) {
          const index = this.addresses.findIndex(x => x.id == address.id);
          this.addresses[index] = address;
        } else {
          this.addresses = this.addresses.concat(address);
        }
      }
    });
    this.getAddresses();
  }

 

  async getAddresses() {
    this.isLoading = true;
    this.globalService.showLoader();
    setTimeout(async () => {
      await this.addressService.getAddresses();
      this.isLoading = false;
      this.globalService.hideLoader();
    }, 3000);
  }

  getIcon(title) {
    return this.globalService.getIcon(title);
  }

  editAddress(address) {}

  deleteAddress(address) {
    console.log('address: ', address);
    this.globalService.showAlert(
      'Are you sure you want to delete this address?',
      'Confirm',
      [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
            return;
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.globalService.showLoader();
            await this.addressService.deleteAddress(address);
            this.globalService.hideLoader();
          }
        }
      ]
    )
  }
  ngOnDestroy(){
    if(this.addressesSubscription) this.addressesSubscription.unsubscribe();
  }
}
