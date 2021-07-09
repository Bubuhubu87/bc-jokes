import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories, Category } from '../models/categories.model';
import { Joke } from '../models/joke.model';

@Injectable({
    providedIn: 'root'
})

export class JokesService {
    private apiBaseUrl = 'https://api.chucknorris.io/';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Categories> {
        const url = [this.apiBaseUrl, 'jokes/categories'].url();
        return this.http.get<Categories>(url)
            .pipe(map((result: any) => this.Map(result)));
    }

    getRandomJokeBy(categoryName: Category): Observable<Joke> {
        const url = [this.apiBaseUrl, 'jokes/random?category=' + categoryName.Name].url();
        return this.http.get<Joke>(url)
            .pipe(map((result: any) =>
                new Joke(result.icon_url, result.id, result.url, result.value)));
    }

    private Map(categoriesResult: string[]): Categories {
        let coreCategories = categoriesResult
            .map<Category>(categoryStringValue => new Category(categoryStringValue));
        return new Categories(coreCategories);
    }
}