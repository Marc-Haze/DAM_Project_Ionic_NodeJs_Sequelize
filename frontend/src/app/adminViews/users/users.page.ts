import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../models/users/user';
import { UsersService } from '../models/users/users.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  // String used to catch the Event in the searchbar and use it to filter 
  public search: string = "";

  public users: Array<User> = [];
  public user: User;


  constructor(private router: Router, private authService: AuthService, private userService: UsersService, private storage: Storage) { }

  ngOnInit() {
    this.loadInfo();
  }

  //User Services and Routes
  async loadInfo() {
    let token = await this.storage.get("token");
    this.userService.getAllUsers(token).subscribe((b: Array<User>) => {
      this.users = b;
    })
  }

  deleteUser(id: number) {
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
        this.userService.deleteUser(id).subscribe(() => {
          this.loadInfo();
        }, err => {
          Swal.fire({
            title: 'Error',
            text: "El empleado aún tiene mantenimientos activos",
            icon: 'warning',
          })
        })
        Swal.fire(
          'Usuario eliminado con éxito',
        )
      }
    })

 
  }

  addUser() {
    this.router.navigateByUrl("/add-user");
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

  //Search-Bar Functions
  setSearchInput(event) {
    console.log(event.detail.value);
    this.search = event.detail.value;
  }

  getSearchInput() {
    return this.search;
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
