import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Biere } from 'src/app/Biere';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApibieroService } from 'src/app/services/apibiero.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';




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
  private routeSub: Subscription;
  
  constructor(private http: HttpClient, 
              private fb: FormBuilder, 
              private bieroService : ApibieroService,
              // pour obtenir l'id depuis l'url
              private _router: Router,
              private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.addform = new FormGroup({
      nom: new FormControl(),
      brasserie: new FormControl(),
      description: new FormControl()      
    })

    this.routeSub = this._route.params.subscribe(params => {
      console.log('params',params);
      console.log('params[id_biere]',params['id_biere']);
      this.id = params['id_biere']; 
      // this.addform.value.id_biere = id;
      
    })
    // this.reactiveForm();
    // this._route.params.subscribe(parameterMap => {
    //   const id = Number(parameterMap.get('id_biere')); //convertir en nombre
      // console.log('id',id)
      
       
    // })
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
    // const body: any = this.addform.value ;
    // const id=this.addform.value.id;
    // console.log('id',id)
    let body: any = 
    {
      "nom": this.addform.value.nom,
      "brasserie": this.addform.value.brasserie,
      "description": this.addform.value.description,
      "image": this.addform.value.image
    }
    console.log(+this.id)
    if(this.id == 0) {//id=0 veut dire creation d'une nouvelle biere, ref.: https://www.youtube.com/watch?v=pkTAFaR5LRM&ab_channel=kudvenkat
      if (!body) {return;}
      console.log(this.addform.value);
      this.bieroService.addBiere(body).subscribe();
    }else {
      let id_biere = this.id;
      this.bieroService.getBiereId(id_biere).subscribe((data)=> {
        console.log(data);
      });
    }
    console.log(this.addform)
  }
  // getBiere(id: number): void {
  //   this.addform.value.image = this.imageUrl;
  //   // const body: any = this.addform.value ;
   
  //   let body: any = 
  //   {
  //     "nom": this.addform.value.nom,
  //     "brasserie": this.addform.value.brasserie,
  //     "description": this.addform.value.description,
  //     "image": this.addform.value.image
  //   }
  //   if(id===0) {//id=0 veut dire creation d'une nouvelle biere, ref.: https://www.youtube.com/watch?v=pkTAFaR5LRM&ab_channel=kudvenkat
  //     if (!body) {return;}
  //     this.bieroService.addBiere(body).subscribe();
  //   }else {
      
  //     this.bieroService.getBiereId(id).subscribe((res:any)=> {
  //       console.log(res.data);
  //       this.biere = res.data;
  //     });
      
  //   }
  // }

 

// Chargement des images

onFileSelected(e: any) {
  this.uploadedFile = <File> e.target.files[0];
  this.imageUrl = this.uploadedFile.name;
 
}

}
