import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestuarantComponent } from './restuarant/restuarant.component';
import { IonicModule } from '@ionic/angular';
import { BannerComponent } from './banner/banner.component';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [
    BannerComponent,
    RestuarantComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    BannerComponent,
    RestuarantComponent,
    LoadingRestaurantComponent,
    EmptyScreenComponent
    
  ],
  entryComponents:[]
  
})
export class ComponentsModule { }
