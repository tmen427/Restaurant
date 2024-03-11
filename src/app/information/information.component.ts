import { Component, ErrorHandler } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, Form }from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../http.service';
import { catchError, throwError, pipe } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

InformationForm = new FormGroup({
  Credit: new FormControl('true', Validators.required),
  Debit: new FormControl('false'),  
  NameonCard: new FormControl('John Doe'), 
  CreditCardNumber: new FormControl('000-000-0000', Validators.required),
  Expiration: new FormControl('12/30'), 
  CVV: new FormControl('000'), 
 // CartItems: new FormControl(localStorage.getItem('myItemList')), 
  CartItems: new FormArray([]), 
  UserName: new FormControl(localStorage.getItem("user"))
})

  get Credit() {
    return this.InformationForm.get("Credit")
  }
  get Debit() {
    return this.InformationForm.get("Debit")
  }
  get NameonCard() {
    return this.InformationForm.get("NameonCard")
  }
  get CreditCardNumber() {
    return this.InformationForm.get("CreditCardNumber")
  }
  get Expiration() {
    return this.InformationForm.get("Expiration")
  }
  get CVV() {
    return this.InformationForm.get("CVV")
  }
  //get CartItems() {
    //return this.InformationForm.get("CartItems")
  //}
  get UserName() {
    return this.InformationForm.get("UserName")
  }
  constructor(private cartService: CartService, private Router: Router, private Http: HttpClient, private HttpService: HttpService) {}
  displayArray: any[] = [];  
  priceArray: any[] = [];
  finalprice: number = 0;  
  finalpricestring: string = "0"; 
  conversion: any[] = []; 
  UserNameFrontend: string = localStorage.getItem("user")!; 

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



 NoErrors: boolean = false; 

  submitInformation() {





    this.displayArray = this.cartService.getCartItems().map((x: any)=>JSON.parse(x));  
    let displayItem = this.displayArray.map((p: any)=>Object.values(p)); 

    for(var i = 0; i<displayItem.length; i++) {
      let price = displayItem[i][1]; 
      let item = displayItem[i][0]; 
      //populate the formarray 
      let cart = this.InformationForm.get("CartItems") as FormArray; 
      cart.push(new FormControl({item: item, price: price}))
   
      let formarrayItem = cart.value[i].item; 
      let formarrayPrice = cart.value[i].price; 
      //  console.log(cart.value)
     this.example = {orderInformationNameonCard: this.InformationForm.value.NameonCard, item: formarrayItem, price : formarrayPrice}
      
    //gets submitted in the for loop, but if an error is thrown break it 
     this.HttpService.MenuForm(this.example).subscribe({
       next: data=>{
         console.log("POST worked!")
         console.log(data);
     },
         
       error: error=> { this.NoErrors = true; 
       }
     }
     )
    }
//if there is an error from the above httpservice then don't continue forward. stop the app

//if the observable returns an error then abort code 
//redirect after...
  // this.HttpService.InformationForm(this.InformationForm.value)
  
    this.displayArray = [];  
    this.priceArray = [];
    this.finalprice = 0;  
    this.finalpricestring = "0"; 
    this.conversion = []; 
    localStorage.clear();
    if (this.NoErrors == true) {
   this.Router.navigate(['complete'])
    }
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
   example: any = {}; 
   
   ngOnInit():void {


    if (this.cartService.getCartSize()>0) {
      this.cartgreaterthenzero = true;
      this.cartiszero = false;  
      this.displayArray = this.cartService.getCartItems().map((x: any)=>JSON.parse(x));  
      let displayItem = this.displayArray.map((p: any)=>Object.values(p)); 
 
    for(var i = 0; i<displayItem.length; i++) {
      let price = displayItem[i][1]; 
      this.priceArray.push(price)
      }

     this.conversion = this.priceArray.map(element=>parseFloat(element));
    
     this.conversion.forEach(element=>this.finalprice+=element)
     this.finalprice = Math.round(this.finalprice*100)/100; 
     this.finalpricestring =  parseFloat(this.finalprice.toString()).toFixed(2); 
      
    }
  }




}
