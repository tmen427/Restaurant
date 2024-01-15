import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ChefsComponent } from './chefs/chefs.component';
import { BookComponent } from './book/book.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InformationComponent } from './information/information.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserInformationComponent } from './user-information/user-information.component';

import { DashboardService } from './dashboard.service';
import { CompleteCheckoutComponent } from './complete-checkout/complete-checkout.component';
import { BookingCompleteComponent } from './booking-complete/booking-complete.component';
import { ContactCompleteComponent } from './contact-complete/contact-complete.component';
import { ErrorPageComponent } from './error-page/error-page.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ChefsComponent,
    BookComponent,
    OrderComponent,
    LoginComponent,
    SignupComponent,
    InformationComponent,
    UserInformationComponent,
    CompleteCheckoutComponent,
    BookingCompleteComponent,
    ContactCompleteComponent,
    ErrorPageComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [CookieService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
