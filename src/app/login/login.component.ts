import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http"; 
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  

})
export class LoginComponent {


constructor(private Http: HttpClient, private cookieService: CookieService, private Router: Router) {  
}

Url: string = "https://localhost:7004/api/Auth/login/"; 

LogIn = new FormGroup({
  UserName: new FormControl(""), 
  Password: new FormControl("")
})

onSubmit() {


  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
  

  let options = { headers: headers, withCredentials: true };

  let username1 = this.LogIn.value.UserName; 
  let password = this.LogIn.value.Password; 
  const body = {username: username1, password: password}; 

  this.Http.post(this.Url, body, {...options, responseType: 'text'}).subscribe(
    response => {       
                 // if ('ey'== response.slice(0,2)) console.log("this is i a valid jwt token")   
                  let x = this.cookieService.get("token");
                  console.log(x); 
                //  const header = { 'Authorization': "Bearer" + ' ' + response }
                //  this.Http.get<any>('https://localhost:7004/api/Auth/getusers', {headers: header}).subscribe(data=>console.log(data))
                  
                 
                  
                  //
                  this.Router.navigate(['userinfo']); 

                 // let x = this.cookieService.get('token'); 
               
                }
    
    //error => console.log(error)

  )}


}






