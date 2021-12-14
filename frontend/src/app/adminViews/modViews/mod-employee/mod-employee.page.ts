import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';

@Component({
  selector: 'app-mod-employee',
  templateUrl: './mod-employee.page.html',
  styleUrls: ['./mod-employee.page.scss'],
})
export class ModEmployeePage implements OnInit {

  myForm: FormGroup
  id: any;
  submitted = false;
  private file: File;
  // imgSrc: String;

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute, private authService: AuthService, private employeeService: EmployeesService) { this.id = this.activatedRoute.snapshot.paramMap.get('id');}

  ngOnInit() {
    this.fetchEmployee(this.id);
    this.myForm = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      telephone: [null],
      job: [''],
      file: [null],
    })
    console.log(this.myForm)
  }

  fetchEmployee(id){
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.myForm.setValue({
        name: data['name'],
        email: data['email'],
        address: data['address'],
        telephone: data['telephone'],
        job: data['job'],
        file: data['filename'],
      });
    })
  }

  // Form Submmit
  get errorCtr() {
    return this.myForm.controls;
  }

  fileChange(fileChangeEvent){
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
        title:'Error',
        text: 'Rellene los campos obligatorios',
        icon: 'warning',
      })
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {
      
      const employee: Employee = this.myForm.value;
      this.employeeService.modifyEmployee(employee, this.id, this.file).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/employees").then(()=>{window.location.reload();});
        Swal.fire('Empleado Modificado con éxito')
      });

    }
    console.log(this.myForm.value)
  }

  cancel(){
    this.myForm.reset;
    this.router.navigateByUrl("/employees").then(()=>{window.location.reload();});
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
