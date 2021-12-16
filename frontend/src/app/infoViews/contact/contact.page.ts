import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  myForm: FormGroup;
  submitted = false;


  constructor(private router: Router, private authService: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      Swal.fire({
        title: 'Error',
        text: "Rellene los todos campos",
        icon: 'warning',
      })
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {
      Swal.fire('¡Su mensaje ha sido enviado!')
      console.log('Mensaje Enviado')
    }
    console.log(this.myForm.value)
  }

  // Menu Navigation Routes
  goToHome() {
    this.router.navigateByUrl("/home");
  }
  goToAboutUs() {
    this.router.navigateByUrl("/about-us");
  }
  goToServices() {
    this.router.navigateByUrl("/service-list");
  }
  goToProfessionals() {
    this.router.navigateByUrl("/professionals");
  }
  goToContact() {
    this.router.navigateByUrl("/contact");
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
      confirmButtonText: 'Delete'
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
