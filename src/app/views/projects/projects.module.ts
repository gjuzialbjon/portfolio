import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectsService } from './services/projects.service';


@NgModule({
  declarations: [
    ProjectsWrapperComponent,
    ProjectsContainerComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    NgbCarouselModule
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule { }
