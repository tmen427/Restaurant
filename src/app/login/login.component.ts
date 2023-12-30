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
  UserName: new FormControl(""), 
  Password: new FormControl("")
})


onSubmit() {


  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
  

  let options = { headers: headers, withCredentials: true };

  let username1 = this.LogIn.value.UserName!; 
  let password = this.LogIn.value.Password; 
  const body = {username: username1, password: password}; 

  this.Http.post(this.Url, body, {...options, responseType: 'text'}).subscribe(
    response => {       
          //         this.Dash.showLogOut(true); 
                //you cannot progress to the next screen without the correct credentials  
                 localStorage.setItem('id_token', response);     
                 //if you get to this point then the username is legitimate  
                 localStorage.setItem("user", username1); 
                  
          
                  if (response=='Invalid UserName' || response == 'Invalid Password') 
                  {
                  localStorage.removeItem("id_token");
                  localStorage.removeItem("user"); 
                  }

                  //redirect 
                  this.Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.Router.navigate(['userinfo']);
                }); 
                 // this.Router.navigate(['userinfo']); 
             
                }
    
    //error => console.log(error)

  )}


}






