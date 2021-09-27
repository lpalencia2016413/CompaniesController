import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarDefaultComponent } from './components/headers/navbar-default/navbar-default.component';
import { HomeComponent } from './components/start/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignOutComponent } from './components/auth/sign-out/sign-out.component';
import { CompaniesComponent } from './components/users/admin/companies/companies.component';
import { EmployeesComponent } from './components/users/company/employees/employees.component';
import { ProductsComponent } from './components/users/company/products/products.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarDefaultComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    CompaniesComponent,
    EmployeesComponent,
    ProductsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
