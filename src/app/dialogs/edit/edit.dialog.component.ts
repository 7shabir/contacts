import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { DataService } from '../../app.services';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage(n) {
    return n==2? 'Enter a valid 10 digit number' :
      this.formControl.hasError('required') ? 'Required Field' :
        '';
  }

  submit() {

    this._dataService.update(this.data._id,this.data)
   .subscribe((data) =>{
      this.dialogRef.close(data);
      }
    ); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
