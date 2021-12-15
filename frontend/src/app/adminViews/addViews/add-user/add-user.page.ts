import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  myForm: FormGroup;
  submitted = false;

  public employees: Array<Employee> = [];

  constructor(private router: Router, private authService: AuthService, private employeeService: EmployeesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false],
      darkMode: [false],
      employeeId: [0, [Validators.required]],
    })
  }

  // Form Submmit
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
        'Usuario añadido con éxito',
      )
      const user: User = this.myForm.value;
      console.log(user);
      this.authService.register(user).subscribe((res) => {
        console.log(user);
        this.myForm.reset;
        this.router.navigateByUrl('/users').then(() => {window.location.reload();});
      });

    }
    console.log(this.myForm.value)

  }

  ionViewDidEnter() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    })
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
