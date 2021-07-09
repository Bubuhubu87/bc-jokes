import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/categories.model';
import { Observable, Subscription } from 'rxjs';
import { DataSharedService } from '../../services/data-shared.service';
import { IJokesService } from '../../services/jokes.interface';
import { Joke } from '../../models/joke.model';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})


export class DetailsComponent implements OnInit, OnDestroy {
    joke!: Joke;
    observableSwitchMap!: Observable<Joke>;
    private subscription$: Subscription = new Subscription;

    constructor(private JokesService: IJokesService,
        private DataSharedService: DataSharedService,
        private router: Router) { }

    ngOnInit(): void {
        this.getRandomJoke();
    }

    getRandomJoke() : void {
        this.observableSwitchMap = this.DataSharedService.currentMessage.pipe(
            switchMap((category: Category) => this.JokesService.getRandomJokeBy(category)));

        this.subscription$ = this.observableSwitchMap.subscribe((result: Joke) => {
            this.joke = result;
        });
    }

    returnToCategories(): void {
        this.router.navigateByUrl('Jokes/Categories');
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}