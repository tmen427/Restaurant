import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  Username: string = localStorage.getItem("user")!; 
  Token: string = localStorage.getItem("id_token")!; 
   
//   UserInformation = new FormGroup({
//     FirstName: new FormControl(),
//     LastName: new FormControl(), 
//     UserName: new FormControl(localStorage.getItem("user")), 
//     Email: new FormControl(), 
//     Address: new FormControl(), 
//     Country: new FormControl(), 
//     State: new FormControl(), 
//     Zip: new FormControl() 
// })

InformationForm = new FormGroup({
  Credit: new FormControl('true', Validators.required),
  Debit: new FormControl('false'),  
  NameonCard: new FormControl('John Doe', [Validators.required, Validators.pattern("^[a-zA-z\\s]*$")]), 
  CreditCardNumber: new FormControl('000-000-0000', Validators.pattern("^[0-9]{3}(-)[0-9]{3}(-)[0-9]{4}")),
  Expiration: new FormControl('12/30', Validators.pattern("^[0-9]{2}(/)[0-9]{2}")), 
  CVV: new FormControl('000', [Validators.pattern("^[0-9]{3}"), Validators.minLength(3)]), 
 // CartItems: new FormControl(localStorage.getItem('myItemList')), 
  //CartItems: new FormArray([]), 
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
     console.log(this.InformationForm.value)
   }
   


   constructor(private Http: HttpClient) {}


    ngOnInit() {     
           

          
           const email = this.InformationForm.value.Email; 
        
           //after logging in the user should have a token  from the local storage
           //use token and add it to the header in order to access this restricted route  
           const header = { 'Authorization': "bearer"+ ' ' + this.Token }
           console.log(header);
           //will restrict access to only the email that is being used in the frontend, also verify in backend
           let url = 'https://localhost:7004/api/Auth/getusers?email='+email; 
           this.Http.get<any>(url, {headers: header}).subscribe(data=> {
            console.log(data)
            console.log("add this data into the forms in near future")
          })
            }

}
