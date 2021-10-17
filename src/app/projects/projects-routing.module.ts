import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectsWrapperComponent,
    },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
