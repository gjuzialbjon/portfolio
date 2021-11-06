import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvWrapperComponent } from './components/cv-wrapper/cv-wrapper.component';


@NgModule({
  declarations: [
    CvWrapperComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule
  ]
})
export class CvModule { }
