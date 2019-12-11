import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';
import {User} from '../viewmodels/user';
import {Currency} from '../viewmodels/currency';
// import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private status = false;
  private user: User;
  private statusSubscription: Subscription;
  private balanceSubscription: Subscription;
  private currency = Currency;

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.statusSubscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
    this.balanceSubscription = this.userService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
    this.balanceSubscription.unsubscribe();
  }
}
