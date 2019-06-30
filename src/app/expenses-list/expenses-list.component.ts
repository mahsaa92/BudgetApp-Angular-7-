import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FoodNode } from './expenses.model';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ExpensesService } from './expenses.service';
import { BehaviorSubject } from 'rxjs';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  @Output() submitTrigger: EventEmitter<null> = new EventEmitter();

  nestedTreeControl: NestedTreeControl<FoodNode>;
  nestedDataSource: MatTreeNestedDataSource<FoodNode>;
  TREE_DATA: FoodNode[] = [];
  dataChange: BehaviorSubject<FoodNode[]> = new BehaviorSubject<FoodNode[]>([]);
  ngOnInit() {

    this.TREE_DATA = this.exService.getExpenses();
    this.exService.expSumValue();
  }

  
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.value,
      date: node.date,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( private exService: ExpensesService ) {
    this.nestedTreeControl = new NestedTreeControl<FoodNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataSource.data = this.exService.getExpenses();
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  private _getChildren = (node: FoodNode) => node.children;

  refreshTree() {
    this.dataSource.data = this.exService.getExpenses();
  }

  deleteExpenses(i: any): void{ 
    this.exService.deleteExp(i);
    this.submitTrigger.emit();
  }

  refreshTreeDataWithDate(date){

    this.dataSource.data = this.exService.getExpensesWithDate(date);
    
   }

}
