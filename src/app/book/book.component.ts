import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  constructor(private Http: HttpService, private Router: Router) {}

  
  BookForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(2)]),
    phone: new FormControl("", Validators.required),
    date: new FormControl(new Date()), 
    time: new FormControl("",Validators.required),
    people: new FormControl("", Validators.required), 
    message: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(2)])
 })

  get name() {
   return this.BookForm.get("name"); 
  }

  get email() {
    return this.BookForm.get("email");
  }

  get phone() {
    return this.BookForm.get("phone")
  }
  get date() {
    return this.BookForm.get("date")
  }

  get time(){
    return this.BookForm.get("data")
  }

  get people() {
    return this.BookForm.get("people")
  }
   
  get message() {
    return this.BookForm.get("message")
  }

   FormSubmit() {
     this.Http.BookForm(this.BookForm.value); 
     }

  
   

}
