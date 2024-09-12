import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountApplicationComponent } from './components/account-application/account-application.component';
import { EmployeeApplicationsComponent } from './components/employee-applications/employee-applications.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { AdminAllaplicationsComponent } from './components/admin-allaplications/admin-allaplications.component';
import { AdminAllAccountsComponent } from './components/admin-all-accounts/admin-all-accounts.component';
import { AdminInterestRateComponent } from './components/admin-interest-rate/admin-interest-rate.component';
import { TransferState } from '@angular/core';
import { TransferComponent } from './components/transfer/transfer.component';

export const routes: Routes = [
    {path:"homepage", component:HomePageComponent},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path: "application-form", component:AccountApplicationComponent},
    {path: "employee-applications", component: EmployeeApplicationsComponent},
    {path:"create-account/:id", component: CreateAccountComponent},
    {path:"adminallaccount", component:AdminAllAccountsComponent},
    {path:"myapplications", component:ViewApplicationsComponent},
    {path:"allapplications", component:AdminAllaplicationsComponent},
    {path:"adminpage", component:AdminpageComponent},
    {path:"interestRate", component:AdminInterestRateComponent},
    {path:"transfer", component:TransferComponent},
    {path:"", component:LoginComponent},
    {path: "*", component:LoginComponent}
];
