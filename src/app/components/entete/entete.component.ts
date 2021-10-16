import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Verifier la route pour afficher ou pas le bouton ajouter
  hasRoute(route: string) {
    return this.router.url === route;
  }

}
