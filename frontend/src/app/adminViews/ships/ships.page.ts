import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
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

  deleteShip(id: number){
    Swal.fire({
      title: 'Eliminar Barco',
      text: "¿Está seguro de eliminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'Ok',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shipService.deleteShip(id).subscribe(() => {
          this.loadInfo();
        }, err => {
          Swal.fire({
            title: 'Error',
            text: "El Barco no se pudo eliminar",
            icon: 'warning',
          })
        })
        Swal.fire(
          'Barco eliminado con éxito',
        )
      }
    })
  }

  addShip(){
    this.router.navigateByUrl("/add-ship");
  }

  modShip() {
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
