import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http"; 
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  

})
export class LoginComponent {


constructor(private Dash: DashboardService, private Http: HttpClient, private cookieService: CookieService, private Router: Router) {  
}

Url: string = "https://localhost:7004/api/Auth/login/"; 

LogIn = new FormGroup({
  Email: new FormControl(""), 
  Password: new FormControl("")
})


onSubmit() {


  // let headers = new HttpHeaders({
  //   'Content-Type': 'Authorization',
  //   'Access-Control-Allow-Origin': '*',
  //   "Access-Control-Allow-Credentials": 'true'
  //   });
  
  let headers = new HttpHeaders({
   // "access-control-allow-origin": "*",
   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //'Access-Control-Allow-Methods': '*',
  })

  let options = { headers: headers, withCredentials: false };

  let email = this.LogIn.value.Email!; 
  let password = this.LogIn.value.Password; 
  
  const body = {email: email, password: password, passwordConfirm: password}; 
  console.log(body)
  //, {...options, responseType: 'text'}
  this.Http.post(this.Url, body,{responseType: 'text'}).subscribe({
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
                  this.Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.Router.navigate(['userinfo']);
                }); 
                 // this.Router.navigate(['userinfo']); 
             
                },
   
                error: error=> {
                  console.log('this is the error')
                  console.log(error);
             
                 }
   
}) 


  }

  
}






