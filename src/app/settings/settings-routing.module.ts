import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeColorsComponent } from './change-colors/change-colors.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeColorsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
