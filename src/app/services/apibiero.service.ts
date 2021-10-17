import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Biere } from '../Biere';



//header pour les requetes http
const headers= new HttpHeaders()
    .set('content-type', 'application/json');

const httpOptions = {
    headers: { Authorization: "Basic " + btoa("biero:biero") }
  }

@Injectable({
  providedIn: 'root'
})
export class ApibieroService {

  private apiUrl = 'http://127.0.0.1:8000/webservice/php/biere/';
  constructor(private http: HttpClient) { }



  getBieres(): Observable<Biere[]> {
    return this.http.get<Biere[]>(this.apiUrl);
  }
  
  getBiereId(id: number): Observable<Biere[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Biere[]>(url);
  }
  
  public sortBiere (): Observable<Biere[]> {
    return this.http.get<Biere[]>(this.apiUrl
  );
  }
  
  deleteBiere(id: Number): Observable<Biere> {
    const url = `${this.apiUrl}${id}`;
    console.log(url);
    return this.http.delete<Biere>(url,httpOptions);
  }

  updateBiere(biere: Biere): Observable<Biere> {
    const url = `${this.apiUrl}/${biere.id_biere}`;
    console.log(biere);
    return this.http.put<Biere>(url, biere, httpOptions);
  }
  
  addBiere({nom,brasserie,description,image}: Biere): Observable<Biere> {
    console.log({nom,brasserie,description,image})
    return this.http.put<Biere>(this.apiUrl, {nom,brasserie,description,image}, httpOptions);

  }
  
}
