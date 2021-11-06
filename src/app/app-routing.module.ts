import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cv',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./views//home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./views/cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./views//projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./views//settings/settings.module').then((m) => m.SettingsModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
