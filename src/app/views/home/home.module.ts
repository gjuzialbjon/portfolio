import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeWrapperComponent } from './components/home-wrapper/home-wrapper.component';


@NgModule({
  declarations: [
    HomeWrapperComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
