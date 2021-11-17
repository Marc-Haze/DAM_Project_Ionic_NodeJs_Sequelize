import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'you-are-logged-in',
    loadChildren: () => import('./you-are-logged-in/you-are-logged-in.module').then( m => m.YouAreLoggedInPageModule)
  },  {
    path: 'about-us',
    loadChildren: () => import('./infoViews/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./infoViews/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'hola',
    loadChildren: () => import('./hola/hola.module').then( m => m.HolaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
