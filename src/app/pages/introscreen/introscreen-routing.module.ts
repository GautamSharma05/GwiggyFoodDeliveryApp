import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroscreenPage } from './introscreen.page';

const routes: Routes = [
  {
    path: '',
    component: IntroscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroscreenPageRoutingModule {}
