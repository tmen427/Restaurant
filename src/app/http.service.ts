import { ErrorHandler, Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry, throwError, pipe, map, Observable, delay, concatWith} from 'rxjs';
import { ValidationErrors } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient, private router: Router) { }


  url: string = "https://localhost:7004/"; 
 //url: string = 'http://34.224.64.48'; 
// url: string = 'https://resturant.tonymdesigns.com/backend/'
 
private handleBackendDownError(error: HttpErrorResponse) {
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


MakeUser(body: any, email: string) {
  let url = this.url+""+"api/Auth/SignUp";

  return this.Http.post<JSON>(url, body).pipe(retry(2), catchError(this.handleBackendDownError))
  .subscribe({
    next: data => {
      //if the backend returns an error
      var backenderror = Object.keys(data); 
  
      if (backenderror[0]=="error") {
       console.log(data)
      }
      else {
      console.log(data); 
      //change this code in the future 
      this.Login(body,email); 
    //  this.router.navigate(['home']);
      }
    },
    error: error=>  {
      console.log("this is the error: ")
      console.log(error)
    }
    })
}



 GetCartItems() {
   this.Http.get<any>('https://localhost:7004/api/Order/CartItems').subscribe({
    next: (data) => console.log("GET worked!"),
    error: (data) => console.log(data)
 })
 }

  InformationForm(body: any) {
    let urlconcat = this.url+""+"api/Order/PaymentInformation"; 
  
  return this.Http.post<any>(urlconcat, body).subscribe({
      next: data=> this.router.navigate(['complete']),
      error: error=> this.router.navigate(['errors'])
    })
  }

//returns an obersvable???
  CheckEmailExist(email: string)  {

    let urlconcat = this.url+""+"api/Auth/CheckDuplicateEmail?email="+email; 
    console.log(urlconcat)
   
    //return obsevable boolean
    return this.Http.get<boolean>(urlconcat);
  }


 AddUserInformation(body: any) {
  let urlconcat = this.url+""+"api/Auth/UserInformation"; 
   
console.log(body.value)
  this.Http.post<any>(urlconcat, body.value).subscribe({
    next: data => this.router.navigate(['saved']), 
    error: error => console.log(error)
  })

 }  

EditUserInformation(email: string, InformationForm: any ) {
  let urlconcant = this.url+""+"api/Auth/UpdateUserInformation?email="+email; 
 console.log(urlconcant)
  this.Http.put<any>(urlconcant, InformationForm.value).subscribe({
    next: data => console.log(data), 
    error: error => console.log(error)
  })

}


 
GetUserInformationByEmail(InformationForm: any, Token: string, Email: string)  {
       //after logging in the user should have a token  from the local storage
           //use token and add it to the header in order to access this restricted route  
           const header = { 'Authorization': "bearer"+ ' ' + Token }
        //  if (InformationForm.value.creditCardNumber == null) console.log("it's nulllll")
           //will restrict access to only the email that is being used in the frontend, also verify in backend
       let url = 'https://localhost:7004/api/Auth/getusers?email='+Email; 
                                        
     return  this.Http.get<any>(url, {headers: header}).pipe(
        map(data=> {
                console.log(data.userInformation)
             if (data.userInformation.creditCardNumber == null) {
             console.log("first time seeeing this page!")
             return true; 
             }
             if (data.userInformation.creditCardNumber != null) {
            //send values from the database to the frontend end forms, but does it autofill even if you do touch the form???
              InformationForm.patchValue({ CartItems: [], CreditCardNumber : data.userInformation.creditCardNumber, NameonCard: data.userInformation.nameonCard, Expiration: data.userInformation.expiration, CVV: data.userInformation.cvv}); 
             console.log("this user has filled out information before!")
             return false; 
            }
      
            //set values within patchvalue 

            return false; 
          }));

     
}




Login(body: Object, email: string) {
    
   let urlconcat = this.url+""+"api/Auth/login/";  
//   let options = { headers: h, withCredentials: false };
 
   //, {...options, responseType: 'text'}
   this.Http.post(urlconcat,body, {responseType: 'text'}).subscribe({
     next: response => {       
           //         this.Dash.showLogOut(true); 
                  console.log("the response says " + response)
                 //you cannot progress to the next screen without the correct credentials  
                  localStorage.setItem('id_token', response);     
                  //if you get to this point then the username is legitimate  
                  localStorage.setItem("user", email); 
                   
           
                   if (response=='Invalid Email' || response == 'Invalid Password') 
                   {
                   localStorage.removeItem("id_token");
                   localStorage.removeItem("user"); 
                   }
 
                   //redirect if there are no errors 
                //   this.Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                     this.router.navigate(['userinfo']);
                // }); 
                  // this.Router.navigate(['userinfo']); 
              
                 },
    
                 error: error=> {
                   console.log('this is the error')
                   console.log(error);
              
                  }
    
 }) 
 


  }




  MenuForm(body: any) {
    let urlconcat = this.url+""+"api/Order/postInfo"; 
 
   return this.Http.post(urlconcat, body).pipe(retry(2), catchError(this.handleBackendDownError)); 
    //.subscribe({
    //  next: data=>{
     //   console.log("POST worked!")
     //   console.log(data);
   // },
       
     // error: error=> { console.log(error);
     // }
   // }
    
  }

  ContactForm(body: any) {
  let urlconcat = this.url+""+"api/Order/ContactInformation"; 
  this.Http.post<any>(urlconcat, body).subscribe({
    //change this in the future
   next: data=>  this.router.navigate(['contactcomplete']), 
   error: error=> {
    console.log(error);
    this.router.navigate(['errors'])
   }
   })
  }

  BookForm(body: any) {
    let urlconcat = this.url+""+"api/Order/BookingInformation"; 
    this.Http.post(urlconcat, body, {responseType: "text" }).subscribe({
      next: data=> this.router.navigate(['bookingcomplete']), 
      error: error=> {
        console.log(error)
        this.router.navigate(['errors'])
      }
  });  
  }
 
}


