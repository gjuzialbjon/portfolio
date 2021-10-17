import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'cv',
        loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule),
    },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
