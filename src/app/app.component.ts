import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Apside';

  cars = ['Toyota', 'Peugeot', 'Renault', 'Citroen']


  myAlert(car:string):void{
    console.log(car);
  }
}
