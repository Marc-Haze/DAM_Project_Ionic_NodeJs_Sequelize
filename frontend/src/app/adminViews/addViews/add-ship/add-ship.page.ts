import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
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
    // if (!this.myForm.valid) {
    //   console.log('Rellene los Campos Obligatorios.')
    //   return false;
    // } else {
    //   const ship: Ship = this.myForm.value;
    //   this.shipService.createShip(ship).subscribe(() => {
    //     this.myForm.reset;
    //     this.router.navigateByUrl("/ships");
    //   });

    // }
    // console.log(this.myForm.value)
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
