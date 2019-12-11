import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {Spending} from '../viewmodels/spending';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private baseUrl = 'http://localhost:5000/api/';

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  `Bearer ${this.userService.user.getValue().token}`)
  };

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  addBalance(money: string) {
    const body = JSON.stringify(money);
    return this.http.post(this.baseUrl + 'balance/' + this.userService.user.getValue().id + '/', body, this.httpOptions);
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'balance/get/' + this.userService.user.getValue().id, this.httpOptions);
  }
}
