
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject,OnInit } from '@angular/core';
import { FormsModule,} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  http=inject(HttpClient)
  newExpense: any = {
    
    amount:  0,
    description:  '',
    
  }
balance: number =0 ;
isEditing: boolean = false;
  newBalance: number = 0;
  expenses: any[] = [];
totalSpent: number = 0;

  ngOnInit(): void {
    this.getExpense();
    
    console.log("ngOnInit is running...");
  }
  getUser(){
    const token = sessionStorage.getItem('token')||'';
    const headers=new HttpHeaders(
      {
        'Authorization':  token
      }
    )
    this.http.get('https://hebsurajtracker.onrender.com/api/user/get-user',{headers}).subscribe((res: any) => {
      this.balance = res.user.balance;
      this.calculateTotalSpent();
    })
  }
  getExpense() {
    const token = sessionStorage.getItem('token')||'';
    const headers=new HttpHeaders(
      {
        'Authorization':  token
      }
    )
    
    console.log(headers)
 return this.http.get('https://hebsurajtracker.onrender.com/api/expense/get-expenses',{headers}).subscribe((res: any) => {
   
   
      this.expenses = res.expense;
      
     
     this.getUser();
     
    
  })
  }
  calculateTotalSpent() {
    this.totalSpent = this.expenses.reduce((acc, exp) => acc + exp.amount, 0);
   
  }
  addExpense() {
    if(this.balance ==0){
      alert('Please enter a balance before adding an expense');
      return;
    }
    const token = sessionStorage.getItem('token')||'';
    const headers=new HttpHeaders(
      {
        'Authorization':  token
      }
    )
    this.http.post('https://hebsurajtracker.onrender.com/api/expense/add-expense',this.newExpense,{headers}).subscribe((res: any) => {
      this.getExpense();
     
      this.newExpense = {
        amount: 0,
        description: '',
      }
    })
  }
  deleteExpense(id: any) {
    const token = sessionStorage.getItem('token')||'';
    const headers=new HttpHeaders(
      {
        'Authorization':  token
      }
    )
    this.http.delete(`https://hebsurajtracker.onrender.com/api/expense/delete-expense/${id}`,{headers}).subscribe((res: any) => {
      this.getExpense();
    })
  }
 
 
 
  update() {
    this.isEditing = true;
  }

  save() {
    
    this.isEditing = false;
    const token = sessionStorage.getItem('token')||'';
    const headers=new HttpHeaders(
      {
        'Authorization':  token
      }
    )
    this.http.post('https://hebsurajtracker.onrender.com/api/user/update-user/',{balance:this.newBalance},{headers}).subscribe((res: any) => {
      this.getExpense();
    })
   
  }

  cancel() {
    this.newBalance = this.balance;
    this.isEditing = false;
  }
  


  
}
