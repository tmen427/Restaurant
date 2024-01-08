import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ChefsComponent } from './chefs/chefs.component';
import { BookComponent } from './book/book.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InformationComponent } from './information/information.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { DashboardService } from './dashboard.service';
import { CompleteCheckoutComponent } from './complete-checkout/complete-checkout.component';
import { BookingCompleteComponent } from './booking-complete/booking-complete.component';
import { ContactCompleteComponent } from './contact-complete/contact-complete.component';
const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path: "menu", component: MenuComponent}, 
  {path: "about", component: AboutComponent}, 
  {path: "contact", component: ContactComponent},
  {path: "chefs", component: ChefsComponent}, 
  {path: "book", component: BookComponent}, 
 // {path: "order", component: OrderComponent}, 
  {path: "login", component: LoginComponent}, 
  {path: "signup", component: SignupComponent}, 
  {path: "information", component: InformationComponent}, 
  {path: "userinfo",   canActivate: [DashboardService], component: UserInformationComponent},
   {path: "complete", component: CompleteCheckoutComponent},
   {path: "bookingcomplete", component: BookingCompleteComponent},
   {path: "contactcomplete", component: ContactCompleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 

})
export class AppRoutingModule { }
