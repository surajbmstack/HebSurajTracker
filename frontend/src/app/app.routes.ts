import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SingupComponent},
    {path:'layout',component:LayoutComponent,children:[
 {
    path: 'dashboard',component:DashboardComponent
 },{
    path:'expense',loadComponent:()=>import('./expense/expense.component').then(m=>m.ExpenseComponent)
 }
    ]

    }
];
