import { Component, OnInit, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApibieroService } from 'src/app/services/apibiero.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { Biere } from 'src/app/Biere';
import { ListeBieres } from 'src/app/ListeBieres';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { BoiteConfirmationComponent } from 'src/app/boite-confirmation/boite-confirmation.component';



@Component({
  selector: 'app-biere',
  templateUrl: './biere.component.html',
  styleUrls: ['./biere.component.css']
})
export class BiereComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatTable) table!: MatTable<ListeBieres>;
  // @Input() biere: Biere;
  bieres: Biere[] = [];
  biere: Biere;
  listBieres: ListeBieres;
  thumbnail: any;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["image","nom","brasserie", "date_ajout", "date_modif", "update", "delete"];
  bieresCount: number = 0;
  //variables de la boite de dialogue
  confirm: string ='';
  cancel: string = '';
  
  constructor(private bieroService : ApibieroService, private router: Router, public dialog: MatDialog) { }
  
  //Boite de dialogue de confirmation de suppresion
  openDialog(): void {
  const dialogRef = this.dialog.open(BoiteConfirmationComponent, {
    height: '200px',
    width: '300px',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.confirm = result;
  });
}
  
  ngOnInit(): void {
    let objectURL: any;
    this.bieroService.getBieres().subscribe((bieres: any) =>{ 
      
      this.dataSource.data = bieres.data;
      this.dataSource.data.map((im: any) =>{
        objectURL =   im.image;
        im.image=objectURL;
        this.bieresCount=this.dataSource.data.length
      });
    }); 
  }

  searchBiere(search: string = '') {
    console.log(this.dataSource.filter);
    this.dataSource.filter = search.toLowerCase().trim();

  }
  
  // ref.: https://material.angular.io/components/sort/overview
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.dataSource = this.dataSource;
  }

  editBiere(id: number) {
    this.router.navigate(['edit/'+id]);
    // this.bieroService.updateBiere(id );
  }
  // deleteBiere(biere: Biere) {
  //   // this.router.navigate(['edit/'+id]);
  //   this.bieroService.deleteBiere(biere);
  // }
  deleteBiere(id: number) {
    console.log(id);
    // this.router.navigate(['edit/'+id]);
    this.bieroService.deleteBiere(id).subscribe(
      () => {
        console.log(this.dataSource.data)
        console.log(id)
        this.dataSource.data = this.dataSource.data.filter((b: any) => b.id_biere !== id);

        });
  }
  // this.bieroService.deleteBiere(id).subscribe(
  //   () => (this.bieres = this.bieres.filter((b) => b.id_biere !== id)));
}
