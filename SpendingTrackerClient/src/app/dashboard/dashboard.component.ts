import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../viewmodels/user';
import {Spending} from '../viewmodels/spending';
import {Category} from '../viewmodels/category';
import {UserService} from '../service/user.service';
import {Currency} from '../viewmodels/currency';
import {SpendingService} from '../service/spending.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private baseUrl = 'http://localhost:5000/api/';
  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  `Bearer ${this.userService.user.getValue().token}`)
  };
  private spendings: Array<Spending>;
  private categories: Array<Category>;
  private currency = Currency;

  private balance: number;
  private spendingToAdd = new Spending();

  constructor(private router: Router, private http: HttpClient, private userService: UserService, private spendingService: SpendingService) {
    this.refresh();
  }

  refresh() {
    this.spendings = new Array<Spending>();
    this.categories = new Array<Category>();
    this.spendingService.getSpendings().subscribe(s => { this.spendings = s; });
    this.getCategories().subscribe(c => { this.categories = c; });
    this.getBalance().subscribe(b => { this.balance = b; });
  }

  addSpending() {
    this.spendingToAdd.currency = this.userService.user.getValue().currency;
    this.spendingToAdd.dateCreated = new Date(Date.now());
    this.spendingToAdd.userId = this.userService.user.getValue().id;
    const body = JSON.stringify(this.spendingToAdd);
    this.spendingService.addSpending(this.spendingToAdd).subscribe(
      ret => {
        this.refresh();
      });
    this.spendingToAdd = new Spending();
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'category/list/' + this.userService.user.getValue().id, this.httpOptions);
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'balance/get/' + this.userService.user.getValue().id, this.httpOptions);
  }

  getCategoryNameById(id: string) {
    // tslint:disable-next-line:triple-equals
    return this.categories.filter(x => x.id == id)[0].name;
  }

  getDate(date: Date): string {
    const tempDate = new Date(date);
    return tempDate.getFullYear().toString() + '.' + tempDate.getDate().toString() + '.' + ('0' + tempDate.getDay().toString().slice(-2));
  }
}
