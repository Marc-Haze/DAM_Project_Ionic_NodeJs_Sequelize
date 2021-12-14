import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

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
    console.log("ENTRANDO A USERS")
    this.router.navigateByUrl("/users");
  }
  goToConfig(){
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

  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

}
