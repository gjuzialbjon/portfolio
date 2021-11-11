import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';


@NgModule({
  declarations: [
    ProjectsWrapperComponent,
    ProjectsContainerComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NgbCarouselModule
  ]
})
export class ProjectsModule { }
