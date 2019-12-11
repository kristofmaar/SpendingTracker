import {Currency} from './currency';

export class User {
  public username: string;
  public name: string;
  public balance: number;
  public currency: Currency;

  public token: string;
  public expiration: string;
}
