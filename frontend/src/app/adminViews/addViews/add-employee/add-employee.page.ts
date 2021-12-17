import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
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
  // imgSrc: String;

  constructor(private router: Router, private authService: AuthService, private employeeService: EmployeesService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      file: [null, [Validators.required]],
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

  fileChange(fileChangeEvent) {
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imgSrc = reader.result as string;
    // }

    this.file = fileChangeEvent.target.files[0];
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
        'Empleado añadido con éxito',
      )
      const employee: Employee = this.myForm.value;
      this.employeeService.createEmployee(employee, this.file).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/employees").then(() => { window.location.reload(); });
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
