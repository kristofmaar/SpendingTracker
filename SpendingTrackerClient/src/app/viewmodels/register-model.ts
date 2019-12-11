import {Currency} from './currency';

export class RegisterModel {
  public email: string;
  public password: string;
  public name: string;
  public currency: Currency;

  constructor(email: string, password: string, name: string, currency: Currency) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.currency = currency;
  }
}
