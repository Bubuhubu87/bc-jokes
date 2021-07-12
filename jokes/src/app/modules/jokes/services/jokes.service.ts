import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from '../models/categories.model';
import { Joke } from '../models/joke.model';
import { IJokesService } from '../interfaces/jokes.interface';
import { CoreCategoriesMapper } from '../mappers/categories.mapper';
import { Category } from '../models/category.model';
import { environment } from './../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class JokesService implements IJokesService {
    constructor(private http: HttpClient,
        private coreCategoriesMapper: CoreCategoriesMapper) { }

    getCategories(): Observable<Categories> {
        const url = [environment.apiUrl, 'jokes/categories'].url();
        return this.http.get<Categories>(url)
            .pipe(map((result: any) => this.coreCategoriesMapper.StringsArrayToCategories(result)));
    }

    getRandomJokeBy(categoryName: Category): Observable<Joke> {
        const url = [environment.apiUrl, 'jokes/random?category=' + categoryName.name].url();
        return this.http.get<Joke>(url)
            .pipe(map((result: any) =>
                new Joke(result.icon_url, result.id, result.url, result.value)));
    }

}
