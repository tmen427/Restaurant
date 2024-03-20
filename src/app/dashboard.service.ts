import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  /**
   *
   */
  constructor(private CookieService: CookieService) {}

  public showingLogout: boolean = false; 

  canActivate(): boolean {
      if (localStorage.getItem("id_token") && localStorage.getItem("user")) 
       {
         return true; 
       }
      return false; 
    }

    
  showLogOut(value: boolean): boolean {
    console.log("the showlogout should have changed from here")
    console.log(value);
    return this.showingLogout = value; 
  }

}
  
//export const canActivate = (isAdmin: boolean, permissionService = inject(DashboardService)) => permissionService.isAdmin(isAdmin);

// const canActivateTeam: CanActivateFn =
//     (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//       return inject(DashboardService).canActivate();
//     };

  

