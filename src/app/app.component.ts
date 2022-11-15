import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';

  onMessage(event:string):void{
    console.log(event)
  }
  onMessage2($event:string):void{
    console.warn($event);
  }
}
