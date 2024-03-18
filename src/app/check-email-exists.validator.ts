import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map,  } from 'rxjs/operators';


import { HttpService } from './http.service';  

  export class CheckEmailExistsValidator {

    static createValidator(HttpService: HttpService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
         return HttpService.CheckEmailExist(control.value)
          .pipe(
      
          //this part is not working....
            map((result: boolean) => {
              console.log("in the custom validators")
              //supposed to return either true or false, returns nothing....
              console.log(result)
             return result ? { EmailDuplicate: true } : null; 
        //  return result? null : {EmailDuplicate: true}
              }), 
              

          )
    
      };
      //this hshould work 
     // return of({'EmailDuplicate': true});
    }
  }
