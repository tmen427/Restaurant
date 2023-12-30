import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  
  constructor(private Http: HttpClient) {
    
    
  }


  ContactForm = new FormGroup({
     name: new FormControl(""),
     email: new FormControl(""),
     subject: new FormControl(""),
     message: new FormControl("")
  })


FormSubmit() {

  this.Http.post<any>("https://localhost:7004/api/Order/Contact", this.ContactForm.value).subscribe(data=>console.log(data))
}

}
