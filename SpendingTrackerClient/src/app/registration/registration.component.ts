import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {RegisterModel} from '../viewmodels/register-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  private email = '';
  private password = '';
  private name = '';
  private currency = 0;

  constructor(private router: Router, private userService: UserService) { }

  register() {
    this.userService.register(new RegisterModel(this.email, this.password, this.name, this.currency)).subscribe(
      ret => {
        if (ret) {
          this.router.navigate(['login']);
        }});
  }
}
