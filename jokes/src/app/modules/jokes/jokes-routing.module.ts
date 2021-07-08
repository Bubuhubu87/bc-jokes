import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
    { path: '', redirectTo: '/Jokes/Categories', pathMatch: 'full' },
    { path: 'Categories', component: CategoriesComponent },
    { path: 'Joke', component: DetailsComponent },
    
  ];
  
  @NgModule({
      declarations: [],
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
  
  export class JokesRoutingModule { }