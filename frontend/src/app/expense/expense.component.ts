import { Component, Input, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

  @Input() masterId: number = 0;

  transcationObj : any = {
    "transactionId": 0,
    "userId": 0,
    "categoryId": 0,
    "amount": 0,
    "date": "2024-05-04T10:47:53.460Z",
    "purpose": "",
    "transactionTypeId": 0
  }

  categoryList: any[]=[];
  transcationList: any[]=[];

  constructor() {
    const loggedUser =  sessionStorage.getItem('budgetUser');
    if(loggedUser != null) {
      this.transcationObj.userId =  JSON.parse(loggedUser).userId;
    }
  }

  ngOnInit(): void {
    this.getAllTranscations(); 
  }

  getCategoryByUser() {
   
  }
  getAllTranscations() {
    
  }
  onSave() {
  
  }
  openModel() {
    this.getCategoryByUser();
    const modal =  document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'block'
    }
  }

  closeModel() {
    const modal =  document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none'
    }
  }
}