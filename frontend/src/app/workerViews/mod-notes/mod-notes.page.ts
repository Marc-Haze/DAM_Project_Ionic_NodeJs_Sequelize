import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintenance } from 'src/app/adminViews/models/maintenances/maintenance';
import { MaintenancesService } from 'src/app/adminViews/models/maintenances/maintenances.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-notes',
  templateUrl: './mod-notes.page.html',
  styleUrls: ['./mod-notes.page.scss'],
})
export class ModNotesPage implements OnInit {
  
  myForm: FormGroup;
  submitted = false;
  id: any;


  constructor(
    public formBuilder: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
     private maintenanceService: MaintenancesService) { this.id = this.activatedRoute.snapshot.paramMap.get('id');}

  ngOnInit() {
    this.fetchMaintenance(this.id);
    this.myForm = this.formBuilder.group({
      service: [''],
      state: [''],
      description: [''],
      dock: [''],
      note: [null],
      employeeId: [0],
      shipId: [0],
    })
    console.log(this.myForm);
  }

  fetchMaintenance(id){
    this.maintenanceService.getMaintenanceById(id).subscribe((data) => {
      this.myForm.setValue({
        service: data['service'],
        state: data['state'],
        description: data['description'],
        dock: data['dock'],
        note: data['note'],
        employeeId: data['employeeId'],
        shipId: data['shipId'],
      });
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {
      const maintenance: Maintenance = this.myForm.value;
      this.maintenanceService.modifyMaintenance(maintenance, this.id).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/worker-maintenances").then(()=>{window.location.reload();});
      });

    }
    console.log(this.myForm.value)
  }

  get errorCtr() {
    return this.myForm.controls;
  }
  
  cancel(){
    this.myForm.reset;
    this.router.navigateByUrl("/worker-maintenances").then(()=>{window.location.reload();});
  }

  // Administration Routes
  goToEmployees() {
    this.router.navigateByUrl("/employees");
  }
  goToShips() {
    this.router.navigateByUrl("/ships");
  }
  goToMaintenances() {
    this.router.navigateByUrl("/maintenances");
  }
  goToUsers() {
    this.router.navigateByUrl("/users");
  }
  goToConfig() {
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
      confirmButtonText: 'Delete'
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
