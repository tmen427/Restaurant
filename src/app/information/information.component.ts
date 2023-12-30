import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormControlName, Validators, FormArray, Form }from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';
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
  CreditCardNumber: new FormControl('000-000-0000'),
  Expiration: new FormControl('12/30'), 
  CVV: new FormControl('000'), 
 // CartItems: new FormControl(localStorage.getItem('myItemList')), 
  CartItems: new FormArray([]), 
  UserName: new FormControl(localStorage.getItem("user"))
})

  constructor(private cartService: CartService, private Router: Router, private Http: HttpClient) {}
  displayArray: any[] = [];  
  priceArray: any[] = [];
  finalprice: number = 0;  
  finalpricestring: string = "0"; 
  conversion: any[] = []; 
  UserNameFrontend: string = localStorage.getItem("user")!; 

  submitInformation() {

    let url = 'https://localhost:7004/api/Order/EntireForm'; 
    
    this.Http.post<any>(url, this.InformationForm.value).subscribe(data=>{
     // console.log(data)
    })

    this.displayArray = this.cartService.getCartItems().map((x: any)=>JSON.parse(x));  
    let displayItem = this.displayArray.map((p: any)=>Object.values(p)); 

    for(var i = 0; i<displayItem.length; i++) {
      let price = displayItem[i][1]; 
      let item = displayItem[i][0]; 
      //populat the formarray 
      let cart = this.InformationForm.get("CartItems") as FormArray; 
      cart.push(new FormControl({item: item, price: price}))
      //handle it like you would a normal array 
      let formarrayItem = cart.value[i].item; 
      let formarrayPrice = cart.value[i].price; 
      //  console.log(cart.value)
      //this.InformationForm.value.NameonCard
     this.example = {orderInformationNameonCard: this.InformationForm.value.NameonCard, item: formarrayItem, price : formarrayPrice}
     this.Http.post("https://localhost:7004/api/Order", this.example).subscribe(data=>console.log(data)); 
 
    }

    console.log(this.InformationForm.value);
   
    this.displayArray = [];  
    this.priceArray = [];
    this.finalprice = 0;  
    this.finalpricestring = "0"; 
    this.conversion = []; 
    localStorage.clear();
    this.Router.navigate(['complete'])
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
