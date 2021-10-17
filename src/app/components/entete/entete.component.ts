import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {
  hasAdd: Observable<boolean>;
  hasBack: Observable<boolean>;
  navigationEvents: Observable<NavigationEnd>;

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }

  
  // Verifier la route pour afficher ou pas le bouton ajouter
  hasRoute(route: string) {
    return this.router.url === route;
   
  }

}
