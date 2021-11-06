import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvWrapperComponent } from './components/cv-wrapper/cv-wrapper.component';

const routes: Routes = [{
  path: '',
  component: CvWrapperComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
