import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private consumerService: ConsumerService, private router:Router, private route:ActivatedRoute) {
    this.consumerForm = new FormGroup({
      id:new FormControl(),
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
    this.subs.push(this.route.paramMap.subscribe({
      next: (params) => {
        this.subs.push(this.consumerService.getConsumer(params.get('id')!).subscribe({
          next:(data:Consumer)=>{this.consumerForm.patchValue(data)},
          error:(error:Error)=>{console.error(error)},
          complete:()=>{}
        }))
      },
      error: (error)=> {console.log(error)},
      complete: ()=>{}
    }))
  }

  validate():void{
    this.subs.push(this.consumerService.saveConsumer(this.consumerForm.value).subscribe({
      next:()=>{this.router.navigateByUrl('/consumer-list')},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    }))
  }
  cancel(){
    this.router.navigateByUrl('/consumer-list')
  }
}
