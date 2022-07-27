import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoading: boolean = false;
  setLoader(){
    this.isLoading = !this.isLoading;
  }
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modeCtrl: ModalController
  ) {}

  showAlert(message: string, header?, buttonArray?) {
    this.alertCtrl
      .create({
        header: header ? header : 'Authentication Failed',
        message: message,
        buttons: buttonArray ? buttonArray : ['okay'],
      })
      .then((alertEl) => alertEl.present());
  }

  async showToast(message: string, color?, position?, duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color ? color : 'primary',
      duration: duration,
      position: position,
    });
    toast.present();
  }

  errorToast(message: string, duration: number = 4000) {
    this.showToast(
      message ? message : 'No Internet Connection',
      'danger',
      'bottom',
      duration
    );
  }

  successToast(message: string) {
    this.showToast(message, 'success', 'bottom');
  }

  showLoader(message?: string, spinner?: any) {
    if(!this.isLoading) this.setLoader();
    return this.loadingCtrl
      .create({
        message: message,
        spinner: spinner ? spinner : 'bubbles',
      })
      .then((res) => {
        res.present().then(() => {
          if (!this.isLoading) {
            res.dismiss().then(() => {
              this.isLoading = false;
            });
          }
        });
      })
      .catch((err) => {
        console.log('Show Loading Error', err);
      });
  }

  async hideLoader() {
    if(this.isLoading) this.setLoader();
    return await this.loadingCtrl.dismiss();
  }

  async showModal(options) {
    const modal = await this.modeCtrl.create(options);
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) return data;
  }

  modelDismiss(val?) {
    let data:any = val? val : null;
    return this.modeCtrl.dismiss(data);
  }

  getIcon(title) {
    const name = title.toLowerCase();
    switch(name) {
      case 'home': return 'home-outline';
      case 'work': return 'briefcase-outline';
      default: return 'location-outline';
    }
  }

}
