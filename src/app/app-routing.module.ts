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
    path: 'cards',
    loadChildren: () => import('./views/cards/cards.module').then((m) => m.CardsModule),
  },
  {
    path: '**',
    redirectTo: 'cards',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
