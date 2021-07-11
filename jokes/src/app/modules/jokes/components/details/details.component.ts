import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/categories.model';
import { Observable, Subscription } from 'rxjs';
import { DataSharedService } from '../../services/data-shared.service';
import { IJokesService } from '../../interfaces/jokes.interface';
import { Joke } from '../../models/joke.model';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../notification-bar/notification.service';

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
        private dataSharedService: DataSharedService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.getRandomJoke();
    }

    getRandomJoke(): void {
        this.observableSwitchMap = this.dataSharedService.currentMessage.pipe(
            switchMap((category: Category) => this.JokesService.getRandomJokeBy(category)));

        this.subscription$ = this.observableSwitchMap.subscribe((result: Joke) => this.fetchJoke(result),
            (error) => {
                this.notificationService.failure(`Some errors occure, please try to pick another category`);
                this.returnToCategories();
                console.error(`Here we can call some functionality to log errors ${error}`);
            });
    }

    returnToCategories(): void {
        this.router.navigateByUrl('Jokes/Categories');
    }

    private fetchJoke(joke: Joke): void {
        if (joke) {
            this.joke = joke;
            this.notificationService.success(`Joke with id "${this.joke.Id}" fetch succesfully`);
        } else {
            this.notificationService.failure(`Unfortunately we could not fetch data, please try to pick another category`);
            this.returnToCategories();
        }
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
