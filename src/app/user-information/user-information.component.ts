import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {
  Username: string = localStorage.getItem("user")!; 
  Token: string = localStorage.getItem("id_token")!; 
   
  UserInformation = new FormGroup({
    FirstName: new FormControl(),
    LastName: new FormControl(), 
    UserName: new FormControl(localStorage.getItem("user")), 
    Email: new FormControl(), 
    Address: new FormControl(), 
    Country: new FormControl(), 
    State: new FormControl(), 
    Zip: new FormControl() 
})

    submitInformation() {
      console.log(this.UserInformation.value)
    }

   constructor(private Http: HttpClient) {}

    ngOnInit() {           
           const header = { 'Authorization': "Bearer" + ' ' + this.Token }
           this.Http.get<any>('https://localhost:7004/api/Auth/getusers', {headers: header}).subscribe(data=>console.log(data))
                  
    }



}
