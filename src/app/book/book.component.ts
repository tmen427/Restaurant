import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  constructor(private Http: HttpService, private Router: Router) {}

  
  BookForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    date: new FormControl(""), 
    time: new FormControl(""),
    people: new FormControl(""), 
    message: new FormControl("")
 })

   
   FormSubmit() {
    console.log(this.BookForm.value)
     this.Http.BookForm(this.BookForm.value); 
    if (this.Http.BookForm !==null) {
      console.log(this.Http.BookForm)
      console.log('possibly in the form response'); 
    }
    //to the route 
    this.Router.navigate(['bookingcomplete'])
   }


}
