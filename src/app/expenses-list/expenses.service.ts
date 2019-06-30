import { Injectable } from '@angular/core';
import { FoodNode } from './expenses.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private obs$ = new BehaviorSubject(0);
  currentMessage = this.obs$.asObservable();

  TREE_DATA: FoodNode[] = [
    {
      name: 'Grocery',
      value: 200,
      date: new Date(2019, 5, 1),
      children: [
        { name: 'Rewe', value: 50, date: new Date(2019, 3, 1) },
        { name: 'Edeka', value: 100, date: new Date(2019, 2, 8) },
        { name: 'Norma', value: 50, date: new Date(2019, 5, 4) },
      ]
    }, {
      name: 'Drugstore',
      value: 100,
      date: new Date(2019, 5, 4),
      children: [
        { name: 'dm', value: 50, date: new Date(2019, 5, 17) },
        { name: 'Müller', value: 50, date: new Date(2019, 1, 1) },

      ]
    }, {
      name: 'Sport',
      value: 300,
      date: new Date(2019, 5, 2),
      children: [
        { name: 'Football', value: 150, date: new Date(2019, 4, 7) },
        { name: 'Basketball', value: 70, date: new Date(2019, 5, 3) },
        { name: 'Climbing', value: 80, date: new Date(2019, 2, 9) },
      ]
    }, {
      name: 'Fixed costs',
      value: 15000,
      date: new Date(2019, 5, 8),
      children: [
        { name: 'insurance', value: 15000, date: new Date(2019, 5, 6) },

      ]
    }, {
      name: 'Travel',
      value: 7500,
      date: new Date(2019, 5, 17),
      children: [

        { name: 'Dortmond', value: 4500, date: new Date(2019, 1, 20) },
        { name: 'London', value: 3000, date: new Date(2019, 5, 4) },
      ]
    },
  ];

  public getExpenses(): any {

    return this.TREE_DATA.slice();

  }

  public addExpenses(expenses: any, category: string, ): any {
    for (const item of this.TREE_DATA) {
      if (item.name === category) {
        item.value += expenses.value;
        item.children.push(expenses);
        this.expSumValue();
        return;
      }
    }
  }

  public getExpensesWithDate(date) {
 
    for (const el of this.TREE_DATA.slice()) {
     el.children = el.children.filter((currValue) => {
        if (currValue.date.getMonth() === date.getMonth()) {
          el.value = currValue.value;
          
        } else {
          el.value = 0;
        }
        return currValue.date.getMonth() === date.getMonth();
      })
    }
    return this.TREE_DATA.slice();
  }

  public deleteExp(element: any): any {

    for (const item of this.TREE_DATA) {
      const itemIndex = item.children.findIndex(el => el === element);
      item.children.splice(itemIndex, 1);
      this.expDeleteValue();
      return;
    }

  }

  public expSumValue() {

    let result = 0;
    for (const item of this.TREE_DATA) {
      item.children.filter((currValue) => {
        result += currValue.value;
        this.obs$.next(result);
      })
    }
  }

  public expDeleteValue() {
    let result = 0;
    for (const item of this.TREE_DATA) {
      item.children.filter((currValue) => {
        result -= currValue.value;
        this.obs$.next(result);
      })
    }
  }
}
