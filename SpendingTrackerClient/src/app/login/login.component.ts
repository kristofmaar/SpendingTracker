import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../viewmodels/login-model';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private username = '';
  private password = '';

  constructor(private router: Router, private userService: UserService) { }

  login() {
    this.userService.login(new LoginModel(this.username, this.password)).subscribe(
      ret => {
        if (ret) {
          this.router.navigate(['dashboard']);
        }});
  }
}
