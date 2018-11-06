import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { DataService } from '../../app.services';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import {AppComponent} from '../../app.component'

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Issue,
              private _dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
   
  ]);

  getErrorMessage(n) {
    return n==2? 'Enter a valid 10 digit number' :
      this.formControl.hasError('required') ? 'Required Field' :
        '';
  }

  submit() {
    console.log(this.data);
   this._dataService.add(this.data)
   .subscribe((data) =>{
      
      this.dialogRef.close(data);
      }
    ); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
