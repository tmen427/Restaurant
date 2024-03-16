import { ErrorHandler, Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry, throwError, pipe} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient, private router: Router) { }
 url: string = "https://localhost:7004/"; 
 //url: string = 'http://34.224.64.48'; 
 //url: string = 'https://resturant.tonymdesigns.com/backend/'
 
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


MakeUser(body: any) {
  let url = this.url+""+"api/Auth/SignUp";

  this.Http.post<any>(url, body).subscribe({
    next: data => console.log(data), 
    error: error=> console.log(error)
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

  MenuForm(body: any) {
    let urlconcat = this.url+""+"api/Order/postInfo"; 
 
   return this.Http.post(urlconcat, body).pipe(retry(3), catchError(this.handleError)); 
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


