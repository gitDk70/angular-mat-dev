import { Component, OnInit, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApibieroService } from 'src/app/services/apibiero.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


import { Biere } from 'src/app/Biere';
import { ListeBieres } from 'src/app/ListeBieres';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-biere',
  templateUrl: './biere.component.html',
  styleUrls: ['./biere.component.css']
})
export class BiereComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatTable) table!: MatTable<ListeBieres>;

  bieres: Biere[] = [];
  biere: Biere;
  listBieres: ListeBieres;
  thumbnail: any;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["image","nom","brasserie", "date_ajout", "date_modif","update", "delete"];
  bieresCount: number = 0;

  constructor(private bieroService : ApibieroService, private router: Router) { }

  
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
  deleteBiere(id: number) {
    this.router.navigate(['edit/'+id]);
    // this.bieroService.updateBiere(id );
  }
   
}
