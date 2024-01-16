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
     name: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
     email: new FormControl("", [Validators.required, Validators.email]),
     subject: new FormControl("",[Validators.required, Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z]+$')]),
     message: new FormControl("", [Validators.required, Validators.maxLength(30)])
  })

  get name() {
    return this.ContactForm.get('name');
  }
  get email() {
    return this.ContactForm.get("email")
  }
  get subject() {
    return this.ContactForm.get("subject")
  }
  get message() {
    return this.ContactForm.get("message")
  }

FormSubmit() {
    console.log(this.ContactForm); 
    this.HttpService.ContactForm(this.ContactForm.value);   
}

ngOnInit() {
 
}

}
