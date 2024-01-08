import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient) { }

  InformationForm(body: any) {
    let url = 'http://34.224.64.48/backend/api/Order/PaymentInformation'
   // let url = 'https://localhost:7004/api/Order/PaymentInformation'; 
    this.Http.post<any>(url, body).subscribe(data=>console.log(data)); 
  }

  MenuForm(body: any) {
   // let url = "https://localhost:7004/api/Order"; 
    let url = "http://34.224.64.48/backend/api/Order"; 
  this.Http.post(url, body).subscribe(data=>console.log(data)); 
  }

  ContactForm(body: any) {
   // let url = "https://localhost:7004/api/Order/ContactInformation"
    let url = "http://34.224.64.48/backend/api/Order/ContactInformation"; 
  this.Http.post<any>(url, body).subscribe(data=>console.log(data)); 
  }

  BookForm(body: any) {
    let url = "https://localhost:7004/api/Order/BookingInformation"; 
  //  let url = "http://34.224.64.48/backend/api/Order/BookingInformation"; 
  const httpHeaders: HttpHeaders = new HttpHeaders({
    responseType: 'text'
});
   this.Http.post(url, body, {responseType: "text" }).subscribe(data=>console.log(data));  
  }
 
}


