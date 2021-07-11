import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { DataSharedService } from '../../services/data-shared.service';
import { IJokesService } from '../../interfaces/jokes.interface';
import { Joke } from '../../models/joke.model';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../notification-bar/notification.service';
import { DetailsTexts } from '../../const_strings/details.text';
import { RoutingStrings } from '../../const_strings/routings.string';

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
            distinctUntilChanged(),
            switchMap((category: Category) => this.JokesService.getRandomJokeBy(category)));

        this.subscription$ = this.observableSwitchMap.subscribe((result: Joke) => this.fetchJoke(result),
            (error) => {
                this.notificationService.failure(DetailsTexts.NOTIFY_FAILURE);
                this.returnToCategories();
                console.error(DetailsTexts.LOG_ERROR_TO_DB);
            });
    }

    returnToCategories(): void {
        this.router.navigateByUrl(RoutingStrings.JOKES_CATEGORIES);
    }

    private fetchJoke(joke: Joke): void {
        if (joke) {
            this.joke = joke;
            this.notificationService.success(`${DetailsTexts.NOTIFY_SUCCESS} ${this.joke.Id}`);
        } else {
            this.notificationService.failure(DetailsTexts.NOTIFY_FAILURE_FETCH_DATA);
            this.returnToCategories();
        }
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
