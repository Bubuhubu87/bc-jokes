import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';
import { Category } from '../models/category.model';
import { Joke } from '../models/joke.model';
import { JokesService } from '../services/jokes.service';

@Injectable({
    providedIn: 'root',
    useClass: JokesService
})
export abstract class JokesInterface {
    abstract getCategories(): Observable<Categories>;
    abstract getRandomJokeBy(categoryName: Category): Observable<Joke>;

}
