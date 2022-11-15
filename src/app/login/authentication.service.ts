import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authentUser(login:string, password:string):any{
    return {
      userId:1,
      login:login,
      firstname:'john',
      lastname:'Doe'
    }
  }
}
