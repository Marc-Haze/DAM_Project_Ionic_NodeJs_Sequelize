import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private storage: Storage) { }

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
      employeeId: null,
    };

    this.authService.login(user).subscribe(async (res) => {
      console.log("HOLAAAA ", res)
      if (!res.access_token) {
        return;
      }

      await this.saveData(res);
      Swal.fire('¡Te has logeado!');

      let role = localStorage.getItem('role');
      console.log("EL ROL ES: " + role)

      if (role == 'worker') {
        console.log("A WOKERS")
        this.router.navigateByUrl('/worker-maintenances');
      } else {
        console.log("A PRINCIPAL");
        this.router.navigateByUrl('/principal');
      }

      // this.router.navigateByUrl('/principal');
      form.reset();
    }, err => {
      Swal.fire({
        title: 'Error de Credenciales',
        text: "El Usuario o Contraseña son incorrectos",
        icon: 'warning',
        confirmButtonColor: 'Ok',
      })
    });
  }

  async saveData(res) {
    console.log(res)
    //If funciton to recognize if a Role Token already exists
    localStorage.getItem('role') ? localStorage.removeItem('role') : null;

    if (res.user) {
      await this.storage.set("token", res.access_token);
      await this.storage.set("employeeId", res.user.employeeId);
    }
    if (res.user.isAdmin) {
      localStorage.setItem('role', "admin");
      return;
    }
    else {
      localStorage.setItem('role', "worker")
    }
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
