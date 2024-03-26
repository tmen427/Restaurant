import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { DashboardService } from './dashboard.service';
import { Router, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resturant';
  cartSize: number = 0;  
  showLogin: boolean = true; 
  showSignup: boolean = true; 
  showLogOut: boolean = this.Dash.showingLogout; 
  
  constructor(private cartService: CartService, private Dash: DashboardService, private router : Router) {}

  LogOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    localStorage.removeItem("myItemList");
    localStorage.removeItem("myItemSize"); 
    location.reload(); 
  }
  

  ngOnInit(): void {
 
   //when  component changing then do the check if the user is logged in ...
   this.showLogOut = this.Dash.showingLogout; 


   //constantly checking the cart information 
    setInterval(()=>{ 
      this.cartSize = this.cartService.getCartSize();
    }, 100);
    
    //check for any changes when the component changes
   this.router.events.subscribe((event) => 
   {

    this.cartSize = this.cartService.getCartSize();

    if (localStorage.getItem("id_token") && localStorage.getItem("user")) {
      this.showLogin = false; 
      this.showSignup = false; 
      this.showLogOut = true; 
    }
    //user will be logged out after payment 
    else {
      this.showLogin = true; 
      this.showSignup = true; 
      this.showLogOut = false; 
    };

   }) 
}



}
