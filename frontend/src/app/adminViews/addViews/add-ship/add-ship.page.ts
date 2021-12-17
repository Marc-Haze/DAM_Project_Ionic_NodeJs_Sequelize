import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { Ship } from '../../models/ships/ship';
import { ShipsService } from '../../models/ships/ships.service';

@Component({
  selector: 'app-add-ship',
  templateUrl: './add-ship.page.html',
  styleUrls: ['./add-ship.page.scss'],
})
export class AddShipPage implements OnInit {

  myForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private authService: AuthService, private shipService: ShipsService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      client: ['', [Validators.required]],
    })
  }

  // Form Submmit
  get errorCtr() {
    return this.myForm.controls;
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
        'Barco añadido con éxito',
      )
      const ship: Ship = this.myForm.value;
      this.shipService.createShip(ship).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/ships").then(()=>{window.location.reload();});
      });

    }
    console.log(this.myForm.value)
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
