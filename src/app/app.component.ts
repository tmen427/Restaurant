import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { DashboardService } from './dashboard.service';




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
  
  constructor(private cartService: CartService, private Dash: DashboardService) {}

  LogOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    localStorage.removeItem("myItemList");
    localStorage.removeItem("myItemSize"); 
    location.reload(); 
  }
  

  ngOnInit(): void {
   //not the best solution
   
   this.showLogOut = this.Dash.showingLogout; 
   console.log(this.Dash.showingLogout)
    setInterval(()=>{ this.cartSize = this.cartService.getCartSize();
         
    }, 100);
    
    if (localStorage.getItem("id_token") && localStorage.getItem("user")) {
      this.showLogin = false; 
      this.showSignup = false; 
      this.showLogOut = true; 
    }
  }

}
