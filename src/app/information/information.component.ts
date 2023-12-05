import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  constructor(private cartService: CartService) {}
  displayArray: any[] = [];  
  priceArray: any[] = [];
  finalprice: number = 0;  
  finalpricestring: string = "0"; 
  conversion: any[] = []; 

  clear() {
    localStorage.clear();
    this.displayArray = [];  
    this.priceArray = [];
    this.finalprice = 0;  
    this.finalpricestring = "0"; 
    this.conversion = []; 
  }
   
   //remove items from the array and re-update the localstorage array
   removeIndex(i:number) {
          //cut it a certain points
      this.displayArray.splice(i,1);  
      this.priceArray.splice(i,1)
   
      //change to floating point 
      this.conversion = this.priceArray.map(element=>parseFloat(element));
    
      let new_price = 0; 
      for (let i = 0; i<this.conversion.length; i++) {
         new_price += this.conversion[i]; 
      }
      this.finalprice = new_price; 
      this.finalprice = Math.round(this.finalprice*100)/100; 
      this.finalpricestring =  parseFloat(this.finalprice.toString()).toFixed(2); 

      

      //update the localstorage with this array
      localStorage.setItem('myItemList', JSON.stringify(this.displayArray));
      localStorage.setItem('myItemSize', JSON.stringify(this.displayArray.length))

      //clear everything
      if(this.displayArray.length==0) { localStorage.clear; this.priceArray = []; this.finalprice = 0}

   }

   cartgreaterthenzero: boolean = false; 
   cartiszero: boolean = true; 
  ngOnInit():void {

    if (this.cartService.getCartSize()>0) {
      this.cartgreaterthenzero = true;
      this.cartiszero = false;  
    this.displayArray = this.cartService.getCartItems().map((x: any)=>JSON.parse(x));  
 
    let p = this.displayArray.map((p: any)=>Object.values(p)); 
    for(var i = 0; i<p.length; i++) {
      let price = p[i][1]; 
      this.priceArray.push(price)
      }
 
     this.conversion = this.priceArray.map(element=>parseFloat(element));
    // console.log(this.conversion)
     this.conversion.forEach(element=>this.finalprice+=element)
     this.finalprice = Math.round(this.finalprice*100)/100; 
     this.finalpricestring =  parseFloat(this.finalprice.toString()).toFixed(2); 
    }
  }

}
