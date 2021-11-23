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
    path: 'about-us',
    loadChildren: () => import('./infoViews/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./infoViews/service-list/service-list.module').then( m => m.ServiceListPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./infoViews/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'professionals',
    loadChildren: () => import('./infoViews/professionals/professionals.module').then( m => m.ProfessionalsPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./adminViews/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./adminViews/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'ships',
    loadChildren: () => import('./adminViews/ships/ships.module').then( m => m.ShipsPageModule)
  },
  {
    path: 'maintenances',
    loadChildren: () => import('./adminViews/maintenances/maintenances.module').then( m => m.MaintenancesPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./adminViews/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'user-config',
    loadChildren: () => import('./adminViews/user-config/user-config.module').then( m => m.UserConfigPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
