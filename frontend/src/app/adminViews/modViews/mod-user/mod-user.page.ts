import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from '../../models/employees/employee';
import { EmployeesService } from '../../models/employees/employees.service';
import { Storage } from '@ionic/storage';
import { UsersService } from '../../models/users/users.service';
import Swal from 'sweetalert2';
import { User } from '../../models/users/user';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.page.html',
  styleUrls: ['./mod-user.page.scss'],
})
export class ModUserPage implements OnInit {

  myForm: FormGroup;
  submitted = false;
  id: any;
  public employees: Array<Employee> = [];
  public employee: Employee;
  private token: String

   constructor(
    private storage: Storage,
    public formBuilder: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService, 
    private employeeService: EmployeesService,
    private userService: UsersService) {this.id = this.activatedRoute.snapshot.paramMap.get('id');}

  ngOnInit() {
    this.fetchUser(this.id);
    this.myForm = this.formBuilder.group({
      username: [''],
      password: [''],
      isAdmin: [false],
      darkMode: [false],
      employeeId: [0],
    })
    console.log(this.myForm);
  }
  
  async fetchUser(id){
     this.token = await this.storage.get("token");
    this.userService.getUserById(id,this.token).subscribe((data) => {
      this.myForm.setValue({
        username: data['username'],
        password: data['password'],
        isAdmin: data['isAdmin'],
        darkMode: data['darkMode'],
        employeeId: data['employeeId'],
      });
    })
  }

  // Form Methods
  get errorCtr() {
    return this.myForm.controls;
  }

  ionViewDidEnter() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    })
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
        'Usuario editado con éxito',
      )
      const user: User = this.myForm.value;
      console.log(this.myForm.value)
      console.log("NOS VAMOS A EDITAAAAAAAAR")
      console.log(user);
      this.authService.modify(user,this.id, this.token).subscribe((res) => {
        console.log(user);
        this.myForm.reset;
        this.router.navigateByUrl('/users').then(() => {window.location.reload();});
      });

    }
    console.log(this.myForm.value)
  }

  cancel(){
    this.router.navigateByUrl('/users');
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
      confirmButtonText: 'Si'
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
