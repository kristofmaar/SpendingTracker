import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RegisterModel} from '../viewmodels/register-model';
import {LoginModel} from '../viewmodels/login-model';
import {tap} from 'rxjs/operators';
import {User} from '../viewmodels/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5000/api/';
  // Observable navItem source
  // tslint:disable-next-line:variable-name
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  private loggedIn = false;
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
  }

  register(registerModel: RegisterModel) {
    const body = JSON.stringify(registerModel);
    this.http.post<string>(this.baseUrl + '/auth/register', body, this.httpOptions);
  }

  login(loginModel: LoginModel) {
    return this.http
      .post<User>(this.baseUrl + '/auth/login', JSON.stringify({ loginModel }), this.httpOptions)
      .pipe(
        tap(res => {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
