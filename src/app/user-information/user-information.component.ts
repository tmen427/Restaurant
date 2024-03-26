import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { concatWith } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  
  constructor(private Http: HttpClient, private HttpService: HttpService) {}
  
  
  
  Username: string = localStorage.getItem("user")!; 
  Token: string = localStorage.getItem("id_token")!; 
   


InformationForm = new FormGroup({
  Credit: new FormControl('true', Validators.required),
  Debit: new FormControl('false'),  
  NameonCard: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-z\\s]*$")]), 
  CreditCardNumber: new FormControl(null, Validators.pattern("^[0-9]{3}(-)[0-9]{3}(-)[0-9]{4}")),
  Expiration: new FormControl(null, Validators.pattern("^[0-9]{2}(/)[0-9]{2}")), 
  CVV: new FormControl(null, [Validators.pattern("^[0-9]{3}"), Validators.minLength(3)]), 
 // CartItems: new FormControl(localStorage.getItem('myItemList')), 
 //set form array to null?
  CartItems: new FormArray([]), 
  //get the email or username from local storage becuase now you should be logged in 
  Email: new FormControl(localStorage.getItem("user"))
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

get Email() {
  return this.InformationForm.get("Email")
}

submitInformation() {
  // create a new route here 
     console.log(this.InformationForm.value)
    this.HttpService.AddUserInformation(this.InformationForm); 
    //add an add button 
   }

editInformation() {
  console.log("edit some information here bro ")
 // console.log(this.InformationForm.value)
  this.HttpService.EditUserInformation(this.Username, this.InformationForm)
}   
  
  togglebutton: boolean = false; 
  oppositetogglebutton: boolean = !this.togglebutton; 
    ngOnInit() {  
      
       this.HttpService.GetUserInformationByEmail(this.InformationForm, this.Token , this.Username).subscribe({
        next: data => {
        this.togglebutton = data; 
        console.log(data)
        },  
    }); 
          //    .subscribe({
          //  next: data=> {
          //   console.log(data.userInformation)
          //   if (data.userInformation.creditCardNumber == null) {
          //    console.log("first time seeeing this page!")
          //    return this.togglebutton = true; 
          //    }
          //   if (data.userInformation.creditCardNumber != null) {
          //     console.log("this user has filled out information before!")
          //    return this.togglebutton = false; 
          //   }
     
          //  this.InformationForm.patchValue({ CartItems: undefined, CreditCardNumber : data.userInformation.creditCardNumber, NameonCard: data.userInformation.nameonCard, Expiration: data.userInformation.expiration, CVV: data.userInformation.cvv}); 
          

          //  return this.togglebutton = false; 
          //  },
          //  error: error=> {
          //     console.log("error communicating with backend ")
          //     console.log(error); 
          //  }
        
          // }) 
        
        
       

          }

}
