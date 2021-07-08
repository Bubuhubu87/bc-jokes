import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';
import { Joke } from '../models/joke.model';

@Injectable({
    providedIn: 'root'
})

export class DutiesService {
    private apiBaseUrl = 'https://api.chucknorris.io/';

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Categories> {
        const url = [this.apiBaseUrl, 'jokes/categories'].url();
        return this.http.get<Categories>(url);
    }

    getRandomJokeBy(categoryName: string): Observable<Joke> {
        const url = [this.apiBaseUrl, 'jokes/random?category=' + categoryName].url();
        return this.http.get<Joke>(url);
    }
}