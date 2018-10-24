import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { DataService } from '../../app.services';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this._dataService.delete(this.data._id)
   .subscribe((data) =>{
      console.log(data);
      }
    );
  }
}
