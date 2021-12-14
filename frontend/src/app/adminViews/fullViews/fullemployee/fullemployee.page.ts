import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';

@Component({
  selector: 'app-fullemployee',
  templateUrl: './fullemployee.page.html',
  styleUrls: ['./fullemployee.page.scss'],
})
export class FullemployeePage implements OnInit {

  public employees: Array<Employee> = [];
  public employee: Employee;
  id: any;
  constructor(private router: Router, private authService: AuthService, private employeeServices: EmployeesService) { }


  ngOnInit(): void {
    this.loadInfo(this.id);
    this.employee;
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
  loadInfo(id: number) {
    this.employeeServices.getEmployeeById(id).subscribe((employee: Employee) => {
      return this.employee = employee;
    })
  }

  deleteEmployee(id: number) {
    this.employeeServices.deleteEmployee(id).subscribe(() => {
      this.router.navigateByUrl('/principal');
    });
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

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }
}
