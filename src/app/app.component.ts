import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FilterPipe }from './filter.pipe';
import {Response, Http} from '@angular/http';
import {MatDialog} from '@angular/material';
import {Issue} from './models/issue';
import { DataService } from './app.services';

import {map, debounceTime, distinctUntilChanged, merge} from 'rxjs/operators'
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  index: number;
  data: any ={};
  contactList:Issue[] = [];

  constructor(public dialog: MatDialog, private http: Http, private _dataService: DataService){}
   
  ngOnInit() {
    this._dataService
    .getAll()
    .subscribe((data) => {this.contactList = data},
    error => () => {console.log("Error while fetching data");}
     );
  }

 

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data:{}
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data)
       this.contactList.push(data)
    });
  }

  startEdit(i: number, contact:Issue) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: contact
    });

    dialogRef.afterClosed().subscribe(data => {
        if(data)
         this.contactList[i]=data;
      });
   
  }

  deleteItem(i: number, contact:Issue) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result===1)
         this.contactList.splice(i,1);
      });
  }
}