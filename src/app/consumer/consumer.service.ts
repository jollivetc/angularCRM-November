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

  createConsumer(consumer:Consumer):Observable<any>{
    return this.http.post<any>('/api/consumers', consumer);
  }
}
