import { Component, ViewChild } from '@angular/core';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { IncomeListComponent } from './income-list/income-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ExpensesListComponent)
  private exList: ExpensesListComponent;

  @ViewChild(IncomeListComponent)
  private incList: IncomeListComponent;
  
  refreshTree(){
    this.exList.refreshTree();
  }
  
  dateFilter(ev: any){
  this.exList.refreshTreeDataWithDate(ev.target.value);
  this.incList.refreshTreeDataWithDate(ev.target.value);
  }

  
  
}
