import { NgModule } from '@angular/core';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { JokesRoutingModule } from './jokes-routing.module';

@NgModule({
  declarations: [CategoriesComponent, DetailsComponent],
  imports: [ JokesRoutingModule ],
  providers: [],
  bootstrap: []
})
export class JokesModule { }
