import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Biere } from 'src/app/Biere';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApibieroService } from 'src/app/services/apibiero.service';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: "Basic " + btoa("biero:biero")
  }),
  method: "PUT"
}

@Component({
  selector: 'app-modif-ajout',
  templateUrl: './modif-ajout.component.html',
  styleUrls: ['./modif-ajout.component.css']
})



export class ModifAjoutComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:8000/webservice/php/biere/';
  uploadedFile: File | null = null;
  imageUrl: string;
  addform: FormGroup;
  biere: Biere;
  id: number;
  nom: string;
  brasserie: string;
  description: string;
  image:string;

  private routeSub: Subscription; //utilisee en ligne 63 pour extraire id de l'url
  
  constructor(private http: HttpClient, 
              private fb: FormBuilder, 
              private bieroService : ApibieroService,
              // pour obtenir l'id depuis l'url
              private _route: ActivatedRoute,
              private dialogservice: DialogService,
              private router: Router) {}

  ngOnInit(): void {
 
    this.addform = new FormGroup({
      nom: new FormControl(),
      brasserie: new FormControl(),
      description: new FormControl() ,
      image: new FormControl()      
    })
    
    //l'id vient de l'url
    this.routeSub = this._route.params.subscribe(params => {
    this.id = params['id_biere']; 
     //si update, recupérer la biere
        if(+this.id!==0) {
        this.bieroService.getBiereId(this.id).subscribe((bieres: any) =>{
            this.nom=bieres.data.nom;
            this.brasserie=bieres.data.brasserie;
            this.description=bieres.data.description;
            this.image=bieres.data.image;
            this.addform.value.nom=this.nom;
            this.addform.value.brasserie=this.brasserie;
            this.addform.value.description=this.description;
            
        });
      }
    })
    
  }

 

  onSubmit(): void {
    this.addform.value.image = 'https://source.unsplash.com/featured/?beer'; //image aleatoire
    let body: any = 
    {
      "nom": this.addform.value.nom,
      "brasserie": this.addform.value.brasserie,
      "description": this.addform.value.description,
      "image": this.addform.value.image
    }

    if(this.id == 0) {
      //id=0 veut dire creation d'une nouvelle biere, ref.: https://www.youtube.com/watch?v=pkTAFaR5LRM&ab_channel=kudvenkat
      if (!body) {return;}
      this.dialogservice.openConfirmDialog('Ajouter cette bière?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.bieroService.addBiere(body).subscribe(()=>{ this.fetchBieres()
            this.router.navigate(['/'])         
          });
        }
      }); 
    }else {
      //id!=0 veut dire un update
      let id_biere = this.id;
      this.dialogservice.openConfirmDialog('Modifier cette bière?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.bieroService.updateBiere(body,id_biere).subscribe(()=>{ this.fetchBieres()
            this.router.navigate(['/'])         
          });
        }
      }); 
     
    }
    
  }
  
      
  
// Chargement des images

onFileSelected(e: any) {
  this.uploadedFile = <File> e.target.files[0];
  this.imageUrl = this.uploadedFile.name;
 
}

suppBiere() {
  this.dialogservice.openConfirmDialog('Supprimer cette bière?')
  .afterClosed().subscribe(res =>{
    if(res){
      this.bieroService.deleteBiere(this.id)
      .subscribe(()=>{ this.fetchBieres()
      }); 
      this.router.navigate(['/'])         
    }
  });
}

onCancel() {
  this.router.navigate(['/'])
}

//recharger la liste des bieres apres une operation CUD
fetchBieres() {
  this.bieroService.getBieres().subscribe();
}
}
