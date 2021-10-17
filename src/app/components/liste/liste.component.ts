import { Component, OnInit, Input } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApibieroService } from 'src/app/services/apibiero.service';
import { Biere } from 'src/app/Biere';
import { ListeBieres } from 'src/app/ListeBieres';
import { DomSanitizer } from '@angular/platform-browser';
import { analyze } from 'eslint-scope';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
 
  bieres: Biere[] = [];
  listBieres: ListeBieres;
  thumbnail: any;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["image","nom","brasserie", "date_ajout", "date_modif"]; //tableau material
  bieresCount: number = 0;

  constructor(private bieroService : ApibieroService, private sanitizer: DomSanitizer) { }

 
 
  ngOnInit(): void {
    //remplir le tableau au depart

    let objectURL: any;
    this.bieroService.getBieres().subscribe((bieres: any) =>{ 
      this.dataSource.data = bieres.data;
     }); 
  }

  
  // ref.: https://material.angular.io/components/sort/overview
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

 

  

}
