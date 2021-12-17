import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Maintenance } from '../models/maintenances/maintenance';
import { MaintenancesService } from '../models/maintenances/maintenances.service';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.page.html',
  styleUrls: ['./maintenances.page.scss'],
})
export class MaintenancesPage implements OnInit {
  // String used to catch the Event in the searchbar and use it to filter the 
  public search: string = "";

  public maintenances: Array<Maintenance> = [];
  public maintenance: Maintenance;

  constructor(private router: Router, private authService: AuthService, private maintenanceService: MaintenancesService) { }

  ngOnInit() {
    this.loadInfo();
  }


  //Maintenance Services and Routes
  loadInfo() {
    this.maintenanceService.getAllMaintenances().subscribe((b: Array<Maintenance>) => {
      this.maintenances = b;
    })
  }

  deleteMaintenance(id: number){
    Swal.fire({
      title: 'Eliminar Mantenimiento',
      text: "¿Está seguro de eliminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'Ok',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.maintenanceService.deleteMaintenance(id).subscribe(() => {
          this.loadInfo();
        }, err => {
          Swal.fire({
            title: 'Error',
            text: "El mantenimiento no se pudo eliminar",
            icon: 'warning',
          })
        })
        Swal.fire(
          'Mantenimiento eliminado con éxito',
        )
      }
    })
  }

  addMaintenance(){
    this.router.navigateByUrl("/add-maintenance");
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
        
        let role = localStorage.getItem('role');
      console.log("EL ROL ES: " + role)

      if (role == 'worker') {
        console.log("A WORKERS")
        this.router.navigateByUrl('/worker-maintenances');
      } else {
        console.log("A PRINCIPAL");
        this.router.navigateByUrl('/principal');
      }
        return;
      }
      this.router.navigateByUrl('/login');
    })
  }

  logout(){
    Swal.fire({
      title: 'Desconexión',
      text: "¿Está seguro de querer desconectarte?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'Ok',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.authService.logout().then(() => {
          this.router.navigateByUrl("/home");
        })
        Swal.fire(
          '¡TE HAS DESCONECTADO!',
        )
      }
    })
  }
}
