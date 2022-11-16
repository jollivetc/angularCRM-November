import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';


@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLogin= {
    required:'valeur obligatoire',
    minlength:'3 caractères obligatoires'
  }
  errorPassword={
    required:'valeur obligatoire',
    no$InPassword:'pas de $ dans le mot de passe'
  }
  loginForm : FormGroup;

  constructor(private authent:AuthenticationService, private router: Router) {
    this.authent.disconnect();
    this.loginForm= new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required,no$InPassword])
    })
  }

  ngOnInit(): void {
  }

  login():void{
    const user = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password);
    if(user){
      this.router.navigateByUrl('/home');
    }
  }
}

function no$InPassword(c:AbstractControl): ValidationErrors|null {
  if((c.value as string).indexOf('$') < 0){
    return null;
  }
  return {no$InPassword:'there should not be a $ in string'}
}

