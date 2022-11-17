import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnInit, OnDestroy {

  consumerForm:FormGroup;
  private subs:Subscription[]=[]
  constructor(private consumerService: ConsumerService, private router:Router) {
    this.consumerForm = new FormGroup({
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
  }

  validate():void{
    this.subs.push(this.consumerService.createConsumer(this.consumerForm.value).subscribe({
      next:(data:any)=>{this.router.navigateByUrl('/consumer-list')},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    }))
  }
  cancel(){
    this.router.navigateByUrl('/consumer-list')
  }
}
