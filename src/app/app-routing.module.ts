import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiereComponent } from './components/biere/biere.component';
import { ListeComponent } from './components/liste/liste.component';
import { ModifAjoutComponent } from './components/modif-ajout/modif-ajout.component';


const routes: Routes = [
  {
      path: '',
      component: ListeComponent

  },
  {
      path: 'biere',
      component: ListeComponent,
     
  },
  {
      path: 'biere/:id_biere',
      component: BiereComponent,
     
  },
  {
      path: 'edit/:id_biere',
      component: ModifAjoutComponent,
     
  },
  {
      path: "**",
      redirectTo: '/'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
