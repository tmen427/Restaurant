import { Component } from '@angular/core';

@Component({
  selector: 'app-complete-checkout',
  templateUrl: './complete-checkout.component.html',
  styleUrls: ['./complete-checkout.component.css']
})
export class CompleteCheckoutComponent {

  calcTime: string = new Date(new Date().getTime() + 30 * 60 * 1000).toLocaleTimeString(); 

}
