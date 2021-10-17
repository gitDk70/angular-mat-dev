import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../DialogData';


@Component({
  selector: 'app-boite-confirmation',
  templateUrl: './boite-confirmation.component.html',
  styleUrls: ['./boite-confirmation.component.css']
})
export class BoiteConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BoiteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit(): void {
    }
    
    closeDialog() {
      this.dialogRef.close(false);
    }
}
