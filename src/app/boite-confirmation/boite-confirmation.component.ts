import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../DialogData';


@Component({
  selector: 'app-boite-confirmation',
  templateUrl: './boite-confirmation.component.html',
  styleUrls: ['./boite-confirmation.component.css']
})
export class BoiteConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BoiteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
}
