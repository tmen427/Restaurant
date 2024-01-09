import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient, private Router: Router) { }
// url: string = "https://localhost:7004/"; 
 //url: string = 'https://34.224.64.48'; 
url: string = 'https://34.224.64.48/backend/'; 
 
//has to inlcude /backend for ngninx
  InformationForm(body: any) {
    let urlconcat = this.url+""+"api/Order/PaymentInformation"; 
   // let urlconcat = this.url+""+"/backend/api/Order/PaymentInformation"; 
    this.Http.post<any>(urlconcat, body).subscribe(data=>console.log(data)); 
  }

  MenuForm(body: any) {
    let urlconcat = this.url+""+"api/Order"; 
    this.Http.post(urlconcat, body).subscribe(data=>console.log(data)); 
  }

  ContactForm(body: any) {
  let urlconcat = this.url+""+"api/Order/ContactInformation"; 
  this.Http.post<any>(urlconcat, body).subscribe(data=>
   { 
    this.Router.navigate(['contactcomplete'])
   // console.log(data); 
   })
  }

  BookForm(body: any) {
    let urlconcat = this.url+""+"api/Order/BookingInformation"; 
    this.Http.post(urlconcat, body, {responseType: "text" }).subscribe(data=> {
      
      //route to the success page 
      this.Router.navigate(['bookingcomplete'])
    //  console.log(data)
    
    });  
  }
 
}


