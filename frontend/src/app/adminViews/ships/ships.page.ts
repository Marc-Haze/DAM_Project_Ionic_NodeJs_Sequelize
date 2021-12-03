import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Ship } from '../models/ships/ship';
import { ShipsService } from '../models/ships/ships.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.page.html',
  styleUrls: ['./ships.page.scss'],
})
export class ShipsPage implements OnInit {

   // String used to catch the Event in the searchbar and use it to filter the 
   public search: string = "";

  public ships: Array<Ship> = [];
  public ship: Ship;

  constructor(private router: Router, private authService: AuthService, private shipService: ShipsService) { }

  ngOnInit() {
    this.loadInfo();
  }

  //Ship Services and Routes
  loadInfo() {
    this.shipService.getAllShips().subscribe((b: Array<Ship>) => {
      this.ships = b;
    })
  }

  deleteEmployee(idShip: number) {
    this.shipService.deleteShip(idShip).subscribe(() => {
      this.loadInfo();
    });
  }

  addEmployee(){
    this.router.navigateByUrl("/add-ship");
  }

  modEmployee() {
    this.router.navigateByUrl("/mod-ship");
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

        this.router.navigateByUrl('/principal');
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
