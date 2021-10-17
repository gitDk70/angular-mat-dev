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

  private routeSub: Subscription;
  
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
    
    this.routeSub = this._route.params.subscribe(params => {
      console.log('params',params);
      console.log('params[id_biere]',params['id_biere']);
      this.id = params['id_biere']; 
     
        if(+this.id!==0) {
        this.bieroService.getBiereId(this.id).subscribe((bieres: any) =>{
            this.nom=bieres.data.nom;
            this.brasserie=bieres.data.brasserie;
            this.description=bieres.data.description;
            this.image=bieres.data.image;
            this.addform.value.nom=this.nom;
            this.addform.value.brasserie=this.brasserie;
            this.addform.value.description=this.description;
            console.log(this.addform.value);
        });
      }
    })
    
  }

  /* Reactive form */
 reactiveForm() {
  this.addform = this.fb.group({
    nom: [''],
    brasserie: [''],
    description: [''],
    image: ['']
  })
}

  onSubmit(): void {
    this.addform.value.image = this.imageUrl;
    let body: any = 
    {
      "nom": this.addform.value.nom,
      "brasserie": this.addform.value.brasserie,
      "description": this.addform.value.description,
      "image": this.addform.value.image
    }
    // let body: any = 
    // {
    //   "nom": this.nom,
    //   "brasserie": this.brasserie,
    //   "description": this.description,
    //   "image": ''
    // }
    if(this.id == 0) {//id=0 veut dire creation d'une nouvelle biere, ref.: https://www.youtube.com/watch?v=pkTAFaR5LRM&ab_channel=kudvenkat
      if (!body) {return;}
      this.bieroService.addBiere(body).subscribe();
      
    }else {
      let id_biere = this.id;
      this.bieroService.getBiereId(id_biere).subscribe();
     
    }
    
  }
  
      
  
// Chargement des images

onFileSelected(e: any) {
  this.uploadedFile = <File> e.target.files[0];
  this.imageUrl = this.uploadedFile.name;
 
}

suppBiere() {
  this.dialogservice.openConfirmDialog()
  .afterClosed().subscribe(res =>{
    if(res){
      this.bieroService.deleteBiere(this.id).subscribe(); 
      this.router.navigate(['/'])         
    }
  });
}

onCancel() {
  this.router.navigate(['/'])
}

}
