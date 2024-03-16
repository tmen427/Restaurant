import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private Http : HttpService) {}

  Url: string = "https://localhost:7004/api/Auth/SignUp"; 

  SignUpForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", Validators.required), 
    PasswordConfirm: new FormControl("", Validators.required)},
    { 
     validators: confirmPasswordValidator
    }
  );
  
 
 get Email() {
  return this.SignUpForm.get("Email"); 
 }

 get Password() {
  return this.SignUpForm.get("Password"); 
 }

 get PasswordConfirm()
  {
    return this.SignUpForm.get("PasswordConfirm")
  }; 



  SubmitSignUp() {
    
    var SignUpForm = this.SignUpForm.value; 
    console.log(this.SignUpForm.value); 
    this.Http.MakeUser(SignUpForm); 

  }



}
