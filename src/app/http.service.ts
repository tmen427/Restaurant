import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient, private router: Router) { }
 url: string = "https://localhost:7004/"; 
 //url: string = 'http://34.224.64.48'; 
//url: string = 'https://resturant.tonymdesigns.com/backend/'
 
 GetCartItems() {
   this.Http.get<any>('https://localhost:7004/api/Order/CartItems').subscribe({
    next: (data) => console.log("GET worked!"),
    error: (data) => console.log(data)
 })
 }

  InformationForm(body: any) {
    let urlconcat = this.url+""+"api/Order/PaymentInformation"; 
  
    this.Http.post<any>(urlconcat, body).subscribe({
      next: data=> this.router.navigate(['complete']),
      error: error=> this.router.navigate(['errors'])
    }); 
  }

  MenuForm(body: any) {
    let urlconcat = this.url+""+"api/Order"; 
    this.Http.post(urlconcat, body).subscribe({
      next: data=>{
        //console.log("POST worked!")
    },
       
      error: error=> console.log(error)
    }); 
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


