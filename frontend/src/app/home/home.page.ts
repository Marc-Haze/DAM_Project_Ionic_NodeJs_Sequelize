import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router) { }

  goToAboutUs() {
    this.router.navigateByUrl("/about-us");
  }

  loginOrJustEnter() {
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        console.log("hubo token")
        this.router.navigateByUrl('/logged');
        return;
      }
      console.log("Entrando a la pagina login");
      this.router.navigateByUrl('/login');
    })
  }
}
