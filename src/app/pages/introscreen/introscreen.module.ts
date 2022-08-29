import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroscreenPageRoutingModule } from './introscreen-routing.module';

import { IntroscreenPage } from './introscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroscreenPageRoutingModule
  ],
  declarations: [IntroscreenPage]
})
export class IntroscreenPageModule {}
