//ref.: https://github.com/CodAffection/Angular-Material-Confirm-Dialog

import { BoiteConfirmationComponent } from './../boite-confirmation/boite-confirmation.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(BoiteConfirmationComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      // data :{
      //   message : msg
      // }
    });
  }
}
