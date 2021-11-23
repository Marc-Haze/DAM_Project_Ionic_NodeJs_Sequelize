import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage {
  constructor(private authService: AuthService, private router: Router) { }

  goToHome(){
    this.router.navigateByUrl("/home");
  }
  goToAboutUs(){
    this.router.navigateByUrl("/about-us");
  }
  goToServices(){
    this.router.navigateByUrl("/service-list");
  }
  goToProfessionals(){
    this.router.navigateByUrl("/professionals");
  }
  goToContact(){
    this.router.navigateByUrl("/contact");
  }
  loginOrJustEnter() {
    this.authService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {

        this.router.navigateByUrl('/principal');
        return;
      }
      this.router.navigateByUrl('/login');
    })
  }
}
