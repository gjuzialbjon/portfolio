import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProjectDetailsComponent } from './components/project-details/project-details.component'
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component'
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ProjectsWrapperComponent,
      },
      {
        path: ':id',
        component: ProjectDetailsComponent,
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
