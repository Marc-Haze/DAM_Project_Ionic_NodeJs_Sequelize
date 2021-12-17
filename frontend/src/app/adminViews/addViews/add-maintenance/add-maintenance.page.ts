import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';
import { Maintenance } from '../../models/maintenances/maintenance';
import { MaintenancesService } from '../../models/maintenances/maintenances.service';
import { Ship } from '../../models/ships/ship';
import { ShipsService } from '../../models/ships/ships.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.page.html',
  styleUrls: ['./add-maintenance.page.scss'],
})
export class AddMaintenancePage implements OnInit {

  myForm: FormGroup;
  submitted = false;

  public employees: Array<Employee> = [];
  public ships: Array<Ship> = [];

  constructor(private router: Router, private authService: AuthService, private maintenanceService: MaintenancesService, private shipService: ShipsService, private employeeService: EmployeesService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      service: ['', [Validators.required]],
      state: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dock: [''],
      note: [null],
      employeeId: [0, [Validators.required]],
      shipId: [0, [Validators.required]],
    })
  }

  // Form Methods
  ionViewDidEnter() {
    this.shipService.getAllShips().subscribe((response) => {
      this.ships = response;
    })
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    })
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      Swal.fire({
        title: 'Error',
        text: "Rellene los campos Obligatorios",
        icon: 'warning',
      })
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {
      Swal.fire(
        'Mantenimiento añadido con éxito',
      )
      const maintenance: Maintenance = this.myForm.value;
      this.maintenanceService.createMaintenance(maintenance).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/maintenances").then(() => { window.location.reload(); });
      });

    }
    console.log(this.myForm.value)

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
