import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IncomeService } from '../income-list/income.service';
import { Income } from '../income-list/income.model';
import { ExpensesService } from '../expenses-list/expenses.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public num1: number;
  public num2: number;
  public revenue: number= 12.09;
  incomes: Income[] = [];
  @Output () dateChangedTrigger = new EventEmitter<string>();

  constructor( private incService: IncomeService, private expService: ExpensesService) {}

  ngOnInit() {

    
    this.incService.currentMessage.subscribe(num1 => 
        { 
          this.num1 = num1;
        });
     
    this.expService.currentMessage.subscribe(num2 =>
      {
         this.num2= num2;
      });
    
  }  

  onDateChange(ev){
    this.dateChangedTrigger.emit(ev);
   }


}
