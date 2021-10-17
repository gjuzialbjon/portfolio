import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';


@NgModule({
  declarations: [
    ProjectsWrapperComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
