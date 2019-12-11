import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RegisterModel} from '../viewmodels/register-model';
import {LoginModel} from '../viewmodels/login-model';
import {tap} from 'rxjs/operators';
import {User} from '../viewmodels/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = new BehaviorSubject<User>(new User());

  private baseUrl = 'https://localhost:5001/api/';
  // Observable navItem source
  // tslint:disable-next-line:variable-name
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  private loggedIn = false;
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  };

  constructor(private router: Router, private http: HttpClient) {
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.loggedIn = !!this.user;
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(registerModel: RegisterModel) {
    const body = JSON.stringify(registerModel);
    return this.http.post<string>(this.baseUrl + 'auth/register', body, this.httpOptions);
  }

  login(loginModel: LoginModel) {
    return this.http
      .post<User>(this.baseUrl + 'auth/login', JSON.stringify(loginModel), this.httpOptions)
      .pipe(
        tap(res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.loggedIn = true;
          this.user.next(res);
          this._authNavStatusSource.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
