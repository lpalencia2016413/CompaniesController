import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/start/home/home.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignOutComponent } from './components/auth/sign-out/sign-out.component';
import { CompaniesComponent } from './components/users/admin/companies/companies.component';
import { EmployeesComponent } from './components/users/company/employees/employees.component';
import { ProductsComponent } from './components/users/company/products/products.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signOut', component:SignOutComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'about',component: AboutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
