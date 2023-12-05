import { Injectable } from '@angular/core';

interface MenuItems{
  item: string, 
  price: string
}

@Injectable({
  providedIn: 'root'
})


export class CartService {
  
  Cart: MenuItems[] = []; 
  menuItem: MenuItems = {item: "", price: ""}; 

 
  constructor() { }

  getCart(): MenuItems[] {
    return this.Cart; 
  }

  putCart(items: string, prices: string) {
    
    this.menuItem = {item: items, price: prices}
    this.Cart.push(this.menuItem)
    localStorage.setItem('myItemList', JSON.stringify(this.Cart));
    localStorage.setItem('myItemSize', JSON.stringify(this.Cart.length))
  } 

  

 
  getCartItems(): any {

    if(localStorage.getItem('myItemList')!== null)
    {
      //remove brackets from the string(array) 
      let removebrackets = localStorage.getItem('myItemList')!;  
      removebrackets = removebrackets.substring(1);
      removebrackets = removebrackets.slice(0,-1); 
      //remove after the second common in the string , make an array out of the string
      let result=removebrackets.match(/[^,]+,[^,]+/g);
   

      return result; 
    }
  
  }



  
 
  getCartSize(): number  {
 
  //check in local storage for correct number of items ordered
  if(localStorage.getItem('myItemList')!== null)
    {
  
      let x  = localStorage.getItem('myItemList')!; 
      const split_string = x.split(",")
    
      return Math.floor(split_string.length/2); 
    }
    return 0; 
  }


}
