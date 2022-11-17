import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Consumer[]>{
    return this.http.get<Consumer[]>('/api/consumers')
  }

  findForCriteria(criteria:string):Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`/api/consumers?q=${criteria}`)
  }

  saveConsumer(consumer:Consumer):Observable<any>{
    if(consumer.id){
      return this.http.put<any>(`/api/consumer/${consumer.id}`, consumer);
    }else{
      return this.http.post<any>('/api/consumers', consumer);
    }
  }

  getConsumer(id:string):Observable<Consumer>{
    return this.http.get<Consumer>(`/api/consumers/${id}`)
  }
}
