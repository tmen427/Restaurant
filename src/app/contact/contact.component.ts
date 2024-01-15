import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  
  constructor(private HttpService: HttpService, private Router: Router) {
    
    
  }


  ContactForm = new FormGroup({
     name: new FormControl(""),
     email: new FormControl(""),
     subject: new FormControl(""),
     message: new FormControl("")
  })


FormSubmit() {
    this.HttpService.ContactForm(this.ContactForm.value);   
}

ngOnInit() {
 
}

}
