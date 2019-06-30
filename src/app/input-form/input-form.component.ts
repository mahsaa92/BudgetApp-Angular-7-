import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IncomeService } from '../income-list/income.service';
import { Income } from '../income-list/income.model';
import { ExpensesService } from '../expenses-list/expenses.service';
import { FoodNode } from '../expenses-list/expenses.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  @Output() submitTrigger: EventEmitter<null> = new EventEmitter();

  show = true;
  messageForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private incService:IncomeService,
              private exService: ExpensesService) { }
  income: Income = {
    value: 0,
    description: "",
    date: new Date()
  };

  expenses: FoodNode []= [{
    name: "",
    value: 0,
    date: new Date(),
    children: [{ name: "", value: 0, date: new Date() }]
  }];

  charge: any ={
    name: "",
    value: 0,
    date:  new Date()

  }
  
  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.expenses = this.exService.getExpenses();
  }
  
  onSubmit(){
    if (this.show == !true) {
      this.income.value = this.messageForm.controls.name.value;
      this.income.description = this.messageForm.controls.message.value;
      this.income.date = this.messageForm.controls.date.value;
      this.incService.addIncome(this.income);

    } else {
      for (const item in this.expenses) {
        if (this.expenses[item].name === this.messageForm.controls.category.value) {
          this.charge.name = this.messageForm.controls.message.value;
          this.charge.value = this.messageForm.controls.name.value;
          this.charge.date = this.messageForm.controls.date.value;
          this.exService.addExpenses(this.charge, this.messageForm.controls.category.value);
          this.submitTrigger.emit();
          return;
        }
        else {
        }
      }
    }
  }

  clickMe() {
    this.show = !this.show;
  }
}
