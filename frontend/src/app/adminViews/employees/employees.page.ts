import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Employee } from '../models/employees/employee';
import { EmployeesService } from '../models/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  // String used to catch the Event in the searchbar and use it to filter the 
  public search: string = "";
  
  public employees: Array<Employee> = [];
  public employee: Employee;

  constructor(private router: Router, private authService: AuthService, private employeeServices: EmployeesService) { }

  ngOnInit(): void {
    this.loadInfo();
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

  //Employee Services and Routes
  loadInfo() {
    this.employeeServices.getAllEmployees().subscribe((b: Array<Employee>) => {
      this.employees = b;
    })
  }

   deleteEmployee(id: number){
    Swal.fire({
      title: 'Eliminar Empleado',
      text: "¿Está seguro de eliminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'Ok',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeServices.deleteEmployee(id).subscribe(() => {
          this.loadInfo();
        }, err => {
          Swal.fire({
            title: 'Error',
            text: "El empleado aún tiene mantenimientos activos",
            icon: 'warning',
          })
        })
        Swal.fire(
          'Empleado eliminado con éxito',
        )
      }
    })
  }

  addEmployee(){
    this.router.navigateByUrl("/add-employee");
  }
  fullView() {
    this.router.navigateByUrl("/fullemployee");
  }


  //Search-Bar Functions
  setSearchInput(event){
    console.log(event.detail.value);
    this.search = event.detail.value;
  }

  getSearchInput(){
    return this.search;
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
