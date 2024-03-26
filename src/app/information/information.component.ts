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

  toggleButton: boolean = false; 
  oppositetogglebutton: boolean = !this.toggleButton; 


InformationForm = new FormGroup({
  Credit: new FormControl('true', Validators.required),
  Debit: new FormControl('false'),  
  NameonCard: new FormControl( 'John Doe', [Validators.required, Validators.pattern("^[a-zA-z\\s]*$")]), 
  CreditCardNumber: new FormControl('000-000-0000', Validators.pattern("^[0-9]{3}(-)[0-9]{3}(-)[0-9]{4}")),
  Expiration: new FormControl('12/30', Validators.pattern("^[0-9]{2}(/)[0-9]{2}")), 
  CVV: new FormControl('000', [Validators.pattern("^[0-9]{3}"), Validators.minLength(3)]), 
 // CartItems: new FormControl(localStorage.getItem('myItemList')), 
  CartItems: new FormArray([]), 
  UserName: new FormControl(localStorage.getItem("user"))
})


Token: string = localStorage.getItem("id_token")!; 
Username: string = localStorage.getItem("user")!; 
 
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
  get CartItems() {
    return this.InformationForm.get("CartItems")
  }
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
      console.log(this.InformationForm.value)
      console.log(this.InformationForm.value.CreditCardNumber)
      console.log(this.InformationForm.value.NameonCard)
     this.example = {orderInformationNameonCard: this.InformationForm.value.NameonCard, item: formarrayItem, price : formarrayPrice}
      console.log(this.example)
    //gets submitted in the for loop, but if an error is thrown break it 
     this.HttpService.MenuForm(this.example).subscribe({
       next: data=>{
         console.log("POST worked!"); 
         this.displayArray = [];  
         this.priceArray = [];
         this.finalprice = 0;  
         this.finalpricestring = "0"; 
         this.conversion = []; 
         localStorage.removeItem("myItemList");
         localStorage.removeItem("myItemSize");
        // localStorage.clear();
         this.Router.navigate(['complete'])
     },
         
       error: error=> { console.log("it has errors!")
      
      }
     }
     )
    }
//if there is an error from the above httpservice then don't continue forward. stop the app

//if the observable returns an error then abort code 
//redirect after...
  // this.HttpService.InformationForm(this.InformationForm.value)

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
   
     if (!this.Token) {
      console.log("not logged in")
      this.oppositetogglebutton = false; 
     } 
     
     //if the user is logged in 
     if (this.Token && this.UserName) { 
    this.HttpService.GetUserInformationByEmail(this.InformationForm, this.Token, this.Username).subscribe({
      next: data =>  {
        console.log(this.toggleButton)
        this.toggleButton = data
      }
     }); 
    }
  //   const email = this.Username;   
  //  // after logging in the user should have a token  from the local storage
  //  // use token and add it to the header in order to access this restricted route  
  //   const header = { 'Authorization': "bearer"+ ' ' + this.Token }
  //  // console.log(header);
  //   //will restrict access to only the email that is being used in the frontend, also verify in backend
  //   let url = 'https://localhost:7004/api/Auth/getusers?email='+email; 
  //   console.log(url)
  //   this.Http.get<any>(url, {headers: header}).subscribe(data=> {
      
  //   this.InformationForm.patchValue({ CreditCardNumber : data.userInformation.creditCardNumber, NameonCard: data.userInformation.nameonCard, CartItems: [], Expiration: data.userInformation.expiration, CVV: data.userInformation.cvv}); 
  
  //    console.log(data.userInformation)        
  //  }) 


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
