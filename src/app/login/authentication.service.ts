import { Injectable } from '@angular/core';
import { User } from './model/user';


const USER_KEY = 'angular.crm.user'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?:User;
  constructor() {
    if(sessionStorage.getItem(USER_KEY)){
      this.user = JSON.parse(sessionStorage.getItem(USER_KEY)!);
    }
  }

  get isAuthenticated():boolean {
    return !!this.user;
  }

  disconnect():void {
    this.user=undefined;
    sessionStorage.clear()
  }

  authentUser(login:string, password:string):User{
    this.user = {
      id:1,
      login:login,
      firstname:'john',
      lastname:'Doe'
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
    return this.user;
  }
}
