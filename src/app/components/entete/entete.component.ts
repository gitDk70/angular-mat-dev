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
    // this.navigationEvents = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   // This one is not really needed but we're giving some hints to the typescript compiler
    //   map(event => event as NavigationEnd) 
    // );
    // // Here we define the stream of booleans that determine whether to show the component or not on your template.
    // this.hasAdd = this.navigationEvents.pipe(
    //    map(event => this.showAdd(event.url))
    // );
    // // Because actually you check for the same conditions
    // this.hasBack = this.hasAdd;
  }


  showAdd(url: string): boolean {
    // And here you should test against regular expressions:
   switch(true) {
      case /\/biere\//.test(url):
      case /\/\/category/.test(url):
      // More cases where you should show the navBar
         return true;
      default: return false;
   }
  }
  
  // Verifier la route pour afficher ou pas le bouton ajouter
  hasRoute(route: string) {
    return this.router.url === route;
   
  }

}
