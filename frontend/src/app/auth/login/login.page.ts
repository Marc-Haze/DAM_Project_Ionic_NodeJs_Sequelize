import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigateByUrl("/home");
  }

  login(form) {
    let user: User = {
      id: null,
      username: form.value.username,
      password: form.value.password,
      isAdmin: null,
      darkMode: null,
    };

    this.authService.login(user).subscribe((res) => {
      if (!res.access_token) {
        return;
      }
      Swal.fire('¡Te has logeado!');
      this.router.navigateByUrl('/principal');
      form.reset();
    }, err => {
      Swal.fire({
        title: 'Error de Credenciales',
        text: "El Usuario o Contraseña son incorrectos",
        icon: 'warning',
        confirmButtonColor:'Ok',
      })
      
    });
  }

  // async presentAlert(message: string) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Error de Credenciales',
  //     subHeader: message,
  //     message: ' Usuario y Contraseña no válidos.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

}
