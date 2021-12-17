import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maintenance } from 'src/app/adminViews/models/maintenances/maintenance';
import { MaintenancesService } from 'src/app/adminViews/models/maintenances/maintenances.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-worker-maintenances',
  templateUrl: './worker-maintenances.page.html',
  styleUrls: ['./worker-maintenances.page.scss'],
})
export class WorkerMaintenancesPage implements OnInit {

  // String used to catch the Event in the searchbar and use it to filter the result
  public search: string = "";

  public maintenances: Array<Maintenance> = [];
  public maintenance: Maintenance;

  public employeeId: number;

  constructor(private router: Router, private authService: AuthService, private maintenanceService: MaintenancesService, private storage: Storage) { }

  ngOnInit() {
    // this.loadInfo();
  }


  ionViewDidEnter(){
    this.getEmployeeId();
    this.maintenanceService.getAllMaintenances().subscribe(
      (response) => {this.maintenances = response;}
    )

  }

  async getEmployeeId(){
    let token =  await this.storage.get("employeeId");
    this.employeeId = token;
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
  goToHome(){
    this.router.navigateByUrl("/home");
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
