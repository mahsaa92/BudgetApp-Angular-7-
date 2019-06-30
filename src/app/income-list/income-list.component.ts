import { Component, OnInit} from '@angular/core';
import { Income } from './income.model';
import { IncomeService } from './income.service';



@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {

  incomes: Income[] = [];
  constructor(private incService: IncomeService) { }

  ngOnInit() {
    const incomeObservable = this.incService.getIncome();
    incomeObservable.subscribe((incomesData: Income[]) => {
      this.incomes = incomesData;
    });
  }

  
  income: Income = {
    value: 0,
    description: "",
    date: new Date()
  };

  deleteIncome(i: any): void {
    this.incService.removeIncome(i);
  }

  refreshTreeDataWithDate(date){
    
    const incomeObservable = this.incService.getExpensesWithDate(date);
    incomeObservable.subscribe((incomesData: Income[]) => {
      this.incomes = incomesData;
      console.log(incomesData)
    });
      
   }

}
