import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeWrapperComponent } from './components/home-wrapper/home-wrapper.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';


@NgModule({
  declarations: [
    HomeWrapperComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule
  ]
})
export class HomeModule { }
