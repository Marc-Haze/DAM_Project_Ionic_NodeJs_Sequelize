import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maintenance } from 'src/app/adminViews/models/maintenances/maintenance';
import { MaintenancesService } from 'src/app/adminViews/models/maintenances/maintenances.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-worker-maintenances',
  templateUrl: './worker-maintenances.page.html',
  styleUrls: ['./worker-maintenances.page.scss'],
})
export class WorkerMaintenancesPage implements OnInit {

  // String used to catch the Event in the searchbar and use it to filter the 
  public search: string = "";

  public maintenances: Array<Maintenance> = [];
  public maintenance: Maintenance;

  constructor(private router: Router, private authService: AuthService, private maintenanceService: MaintenancesService) { }

  ngOnInit() {
    // this.loadInfo();
  }

  //Maintenance Services and Routes
  loadInfo() {
    let employeeId =  parseInt(localStorage.getItem("employeeId"));
    console.log(employeeId)
    this.maintenanceService.getMatchedMaintenances(employeeId).subscribe((b: Array<Maintenance>) => {
      this.maintenances = b;
    })
  }

  //Search-Bar Functions
  setSearchInput(event){
    console.log(event.detail.value);
    this.search = event.detail.value;
  }

  getSearchInput(){
    return this.search;
  }

   // Administration Routes
   goToEmployees(){
    this.router.navigateByUrl("/employees");
  }
  goToShips(){
    this.router.navigateByUrl("/ships");
  }
  goToMaintenances(){
    this.router.navigateByUrl("/maintenances");
  }
  goToUsers(){
    this.router.navigateByUrl("/users");
  }
  goToConfig(){
    this.router.navigateByUrl("/user-config");
  }

  // Auth Service Routes
  loginOrJustEnter() {
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {

        this.router.navigateByUrl('/worker-maintenances');
        return;
      }
      this.router.navigateByUrl('/login');
    })
  }

  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }



}
