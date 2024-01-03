import { Routes } from '@angular/router';
import { AccSummaryComponent } from './acc-summary/acc-summary.component';
import { Acc1Detail1Component } from './acc1-detail1/acc1-detail1.component';

import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { homedir } from 'os';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path:"accSummary/:id" , component:AccSummaryComponent},
    {path:"acc1Detail1/:accId",component:Acc1Detail1Component},
    {path:"login",component:LoginComponent},
    {path:"transaction/:accId",component:TransactionComponent},
    {path:"transactionHistory",component:TransactionHistoryComponent},
    {path:"home",component:HomeComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
];
