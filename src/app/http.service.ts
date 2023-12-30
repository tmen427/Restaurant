import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private Http: HttpClient) { }

  InformationForm(body: any) {
    let url = 'https://localhost:7004/api/Order/PaymentInformation'; 
    this.Http.post<any>(url, body).subscribe(data=>console.log(data)); 
  }

  MenuForm(body: any) {
  this.Http.post("https://localhost:7004/api/Order", body).subscribe(data=>console.log(data)); 
  }

  ContactForm(body: any) {
  this.Http.post<any>("https://localhost:7004/api/Order/ContactInformation", body).subscribe(data=>console.log(data))
  }



}


