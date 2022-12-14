import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';


@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorLogin= {
    required:'valeur obligatoire',
    minlength:'3 caractères obligatoires'
  }
  errorPassword={
    required:'valeur obligatoire',
    no$InPassword:'pas de $ dans le mot de passe'
  }
  loginForm : FormGroup;
  private subs:Subscription[]=[];

  constructor(private authent:AuthenticationService, private router: Router) {
    this.authent.disconnect();
    this.loginForm= new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required,no$InPassword])
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
  }

  login():void{
    this.subs.push(this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password).subscribe({
      next:(user:User)=>{this.router.navigateByUrl('/home');},
      error:(error:Error)=>{alert(JSON.stringify(error))},
      complete:()=>{}
    }))
  }
}

function no$InPassword(c:AbstractControl): ValidationErrors|null {
  if((c.value as string).indexOf('$') < 0){
    return null;
  }
  return {no$InPassword:'there should not be a $ in string'}
}

