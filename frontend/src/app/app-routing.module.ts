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
  },  {
    path: 'add-employee',
    loadChildren: () => import('./adminViews/addViews/add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./adminViews/addViews/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'add-ship',
    loadChildren: () => import('./adminViews/addViews/add-ship/add-ship.module').then( m => m.AddShipPageModule)
  },
  {
    path: 'add-maintenance',
    loadChildren: () => import('./adminViews/addViews/add-maintenance/add-maintenance.module').then( m => m.AddMaintenancePageModule)
  },
  {
    path: 'fullemployee',
    loadChildren: () => import('./adminViews/fullViews/fullemployee/fullemployee.module').then( m => m.FullemployeePageModule)
  },
  {
    path: 'mod-employee',
    loadChildren: () => import('./adminViews/modViews/mod-employee/mod-employee.module').then( m => m.ModEmployeePageModule)
  },
  {
    path: 'mod-ship',
    loadChildren: () => import('./adminViews/modViews/mod-ship/mod-ship.module').then( m => m.ModShipPageModule)
  },
  {
    path: 'mod-maintenance',
    loadChildren: () => import('./adminViews/modViews/mod-maintenance/mod-maintenance.module').then( m => m.ModMaintenancePageModule)
  },
  {
    path: 'mod-user',
    loadChildren: () => import('./adminViews/modViews/mod-user/mod-user.module').then( m => m.ModUserPageModule)
  },
  {
    path: 'worker-maintenances',
    loadChildren: () => import('./workerViews/worker-maintenances/worker-maintenances.module').then( m => m.WorkerMaintenancesPageModule)
  },
  {
    path: 'mod-maintenances',
    loadChildren: () => import('./workerViews/mod-maintenances/mod-maintenances.module').then( m => m.ModMaintenancesPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
