import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
    path: '**',
    redirectTo: 'home',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
