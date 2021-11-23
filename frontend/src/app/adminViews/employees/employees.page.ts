import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from '../models/employees/employee';
import { EmployeesService } from '../models/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  public employees: Array<Employee> = [];
  public employee: Employee;

  constructor(private router: Router, private authService: AuthService, private employeeServices: EmployeesService) { }

  ngOnInit(): void {
    this.loadInfo();
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

  //Employee Services
  loadInfo() {
    this.employeeServices.getAllEmployees().subscribe((b: Array<Employee>) =>{
      this.employees = b;
    })
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
