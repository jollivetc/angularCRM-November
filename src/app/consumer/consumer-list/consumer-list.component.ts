import { Component, OnInit } from '@angular/core';
import { debounceTime, flatMap, map, mergeMap, Observable, Subject } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit {

  consumersObs?:Observable <Consumer[]>;
  searchCriteria:string = '';
  keyUp = new Subject<KeyboardEvent>()

  constructor(private consumerService: ConsumerService) { }

  ngOnInit(): void {
    this.consumersObs = this.consumerService.getAll()
    this.consumersObs = this.keyUp.pipe(
      debounceTime(1000),
      mergeMap(()=>{
        return this.consumerService.findForCriteria(this.searchCriteria!)
      })
    )
  }
  search():void{
    this.consumersObs=this.consumerService.findForCriteria(this.searchCriteria!)
  }
}
