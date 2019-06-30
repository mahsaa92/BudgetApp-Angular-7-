import { Injectable } from '@angular/core';
import { Income } from './income.model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class IncomeService {

  private obs$ = new BehaviorSubject(0);
  currentMessage = this.obs$.asObservable();

  constructor() { }

  incomes: Income[] = [{

    value: 200000,
    description: 'Gehalt',
    date: new Date(2019, 5, 17)
  }, {

    value: 5000,
    description: 'Geschenk',
    date: new Date(2019, 5, 11)
  },
  {

    value: 7000,
    description: 'Bonus',
    date: new Date(2019, 2, 11)
  },
  {

    value: 500,
    description: 'Urlaub',
    date: new Date(2019, 3, 11)
  },
  {

    value: 15000,
    description: 'Gehalt',
    date: new Date(2019, 4, 11)
  }

  ];


  public getIncome(): any {
    const incomeObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.incomes);
      }, 1000);
    });
    this.sumIncomeValue();
    return incomeObservable;
  }

  public getExpensesWithDate(date) {
    for (const item of this.incomes) {
      if (item.date.getMonth() === date.getMonth()) {
        const incomeObservable = new Observable(observer => {
          setTimeout(() => {
            observer.next(item);
          }, 1000);
        });
        return incomeObservable;
      }
      else {
        console.log("not equal");
      }
    }
  }

  public addIncome(add: Income): any {
    this.incomes.push(add)
    this.sumIncomeValue();
  }

  public removeIncome(i: number): void {

    this.incomes.splice(i, 1);
    this.deleteIncomeValue();
  }

  public sumIncomeValue(): any {
    let result = 0;
    for (const item of this.incomes) {
      result += item.value;
    }
    this.obs$.next(result);
  }

  public deleteIncomeValue(): any {
    let result = 0;
    for (const item of this.incomes) {
      result -= item.value;
    }
    this.obs$.next(result);
  }
}
