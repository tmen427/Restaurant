import { Component } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

constructor(private cartService: CartService) {}
  

PutIntoCart(item: string, price: string)
{
 this.cartService.putCart(item, price);
 
}

breakfeastTime: boolean = false; 
lunchTime: boolean = false; 
dinnerTime: boolean = false; 




ngOnInit(): void {
 
let date = new Date(); 
let hours = date.getHours(); 

if (hours<=11) {
 
  this.breakfeastTime = true; 
  this.lunchTime = false; 
  this.dinnerTime = false; 
} 
if (hours>=12 && hours <=14) {

  this.breakfeastTime = false; 
  this.lunchTime = true; 
  this.dinnerTime = false; 
}
if (hours>=15) {

  this.breakfeastTime = false; 
  this.lunchTime = false; 
  this.dinnerTime = true; 
}

//this should work because on each page reload..the cart array will be zero. so refill cart from localstorage
if (this.cartService.getCartSize()>0) {
  let x = this.cartService.getCartItems().map((x: any)=>JSON.parse(x));
  let p = x.map((p: any)=>Object.values(p)); 
//put all values that were in cart, backinto the cart...
for(var i = 0; i<p.length; i++) {
    let item = p[i][0];
    let price = p[i][1]; 
     this.cartService.putCart(item, price); 
      }
  }

  }
  
}
