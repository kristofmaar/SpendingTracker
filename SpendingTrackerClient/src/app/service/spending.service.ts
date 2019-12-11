import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RegisterModel} from '../viewmodels/register-model';
import {LoginModel} from '../viewmodels/login-model';
import {tap} from 'rxjs/operators';
import {User} from '../viewmodels/user';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {Spending} from '../viewmodels/spending';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  private baseUrl = 'https://localhost:5001/api/';

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  `Bearer ${this.userService.user.getValue().token}`)
  };

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  addSpending(spending: Spending) {
    const body = JSON.stringify(spending);
    return this.http.post<string>(this.baseUrl + 'spending/add', body, this.httpOptions);
  }

  getSpendings(): Observable<Spending[]> {
    return this.http.get<Spending[]>(this.baseUrl + 'spending/list/' + this.userService.user.getValue().id, this.httpOptions);
  }
}
