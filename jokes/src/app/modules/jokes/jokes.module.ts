import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { JokesRoutingModule } from './jokes-routing.module';
import { CoreCategoriesMapper } from './mappers/categories.mapper';
import { DataSharedService } from './services/data-shared.service';
import { JokesService } from './services/jokes.service';

@NgModule({
  declarations: [CategoriesComponent, DetailsComponent],
  imports: [JokesRoutingModule, CommonModule],
  providers: [JokesService, DataSharedService, CoreCategoriesMapper ],
  bootstrap: []
})
export class JokesModule { }
