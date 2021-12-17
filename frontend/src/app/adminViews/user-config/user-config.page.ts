import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.page.html',
  styleUrls: ['./user-config.page.scss'],
})
export class UserConfigPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
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
