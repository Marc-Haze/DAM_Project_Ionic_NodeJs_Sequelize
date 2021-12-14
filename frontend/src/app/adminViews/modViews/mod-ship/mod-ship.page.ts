import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Ship } from '../../models/ships/ship';
import { ShipsService } from '../../models/ships/ships.service';

@Component({
  selector: 'app-mod-ship',
  templateUrl: './mod-ship.page.html',
  styleUrls: ['./mod-ship.page.scss'],
})
export class ModShipPage implements OnInit {

  myForm: FormGroup
  id: any;
  submitted = false;
  
  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute, private authService: AuthService, private shipService: ShipsService) {this.id = this.activatedRoute.snapshot.paramMap.get('id');}

  ngOnInit() {
    this.fetchShip(this.id);
    this.myForm = this.formBuilder.group({
      name: [''],
      type: [''],
      client: [''],
    })
    console.log(this.myForm)
  }

  fetchShip(id){
    this.shipService.getShipById(id).subscribe((data) => {
      this.myForm.setValue({
        name: data['name'],
        type: data['type'],
        client: data['client'],
      });
    })
  }

  // Form Submmit
  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('Rellene los Campos Obligatorios.')
      return false;
    } else {
      const ship: Ship = this.myForm.value;
      this.shipService.modifyShip(ship, this.id).subscribe(() => {
        this.myForm.reset;
        this.router.navigateByUrl("/ships").then(()=>{window.location.reload();});
      });

    }
    console.log(this.myForm.value)
  }

  cancel(){
    this.myForm.reset;
    this.router.navigateByUrl("/ships").then(()=>{window.location.reload();});
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
