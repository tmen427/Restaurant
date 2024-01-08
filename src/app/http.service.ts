import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient) { }
  url: string = "https://localhost:7004/"; 
 //url: string = 'http://34.224.64.48/'; 
 

  InformationForm(body: any) {
    let urlconcat = this.url+""+"backend/api/Order/PaymentInformation"; 
    this.Http.post<any>(urlconcat, body).subscribe(data=>console.log(data)); 
  }

  MenuForm(body: any) {
    let urlconcat = this.url+""+"backend/api/Order"; 
    this.Http.post(urlconcat, body).subscribe(data=>console.log(data)); 
  }

  ContactForm(body: any) {
  let urlconcat = this.url+""+"backend/api/Order/ContactInformation"; 
  this.Http.post<any>(urlconcat, body).subscribe(data=>console.log(data)); 
  }

  BookForm(body: any) {
    let urlconcat = this.url+""+"backend/api/Order/BookingInformation"; 
    this.Http.post(urlconcat, body, {responseType: "text" }).subscribe(data=>console.log(data));  
  }
 
}


