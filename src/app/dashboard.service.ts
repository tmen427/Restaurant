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
  constructor(private CookieService: CookieService) {
    
    
  }

  canActivate(): boolean {

    if (this.CookieService.get("token")) {
      return true}; 
    
      return false; 
  }


}
  
//export const canActivate = (isAdmin: boolean, permissionService = inject(DashboardService)) => permissionService.isAdmin(isAdmin);

const canActivateTeam: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(DashboardService).canActivate();
    };

  

