import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/Jokes/Categories', pathMatch: 'full' },
  { path: 'Jokes', loadChildren: () => import('./modules/jokes/jokes.module').then((module) => module.JokesModule) },
  { path: '**', redirectTo: '/Jokes/Categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
