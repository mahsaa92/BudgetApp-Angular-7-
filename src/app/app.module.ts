import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputFormComponent } from './input-form/input-form.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule, MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatCheckboxModule,MatRadioModule, MatNativeDateModule, MatDividerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { MatListModule} from '@angular/material/list'; 
import { HttpClientModule } from '@angular/common/http';
import { ExpensesService } from './expenses-list/expenses.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IncomeService } from './income-list/income.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputFormComponent,
    IncomeListComponent,
    ExpensesListComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    NgbModule
  


  ],
  providers: [ExpensesService, IncomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
  
platformBrowserDynamic().bootstrapModule(AppModule);