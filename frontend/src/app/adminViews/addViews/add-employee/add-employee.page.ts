import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { threadId } from 'worker_threads';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  myForm: FormGroup;
  submitted = false;

  private file: File;

  constructor(private router: Router, private authService: AuthService, private employeeService: EmployeesService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      file: [null],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: [null],
      telephone: [null],
      job: ['', [Validators.required]],
    })
  }

  // Form Submmit
  get errorCtr() {
    return this.myForm.controls;
  }

  fileChange(fileChangeEvent){
      this.file = fileChangeEvent.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {

      const employee: Employee = this.myForm.value;
      this.employeeService.createEmployee(employee, this.file).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/employees");
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
