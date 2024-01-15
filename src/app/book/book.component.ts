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
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required), 
    time: new FormControl("", Validators.required),
    people: new FormControl("", Validators.required), 
    message: new FormControl("", Validators.required)
 })

   
   FormSubmit() {
     this.Http.BookForm(this.BookForm.value); 
     }

  
   

}
