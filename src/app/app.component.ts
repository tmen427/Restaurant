import { Component } from '@angular/core';
import { CartService } from './cart.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resturant';
  cartSize: number = 0;  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  
   //not the best solution
    setInterval(()=>{ this.cartSize = this.cartService.getCartSize(); }, 100);
    //console.log("in the app.component" + this.cartService.getCartSize())
  }

}
