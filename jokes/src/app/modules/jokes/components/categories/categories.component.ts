import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Categories, Category } from '../../models/categories.model';
import { DataSharedService } from '../../services/data-shared.service';
import { NotificationService } from '../notification-bar/notification.service';
import { IJokesService } from '../../interfaces/jokes.interface';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit, OnDestroy {
    private cacheCategories = 'categories';
    private subscription$: Subscription = new Subscription;
    categories: Category[] = [];

    constructor(private JokesService: IJokesService,
        private dataSharedService: DataSharedService,
        private router: Router,
        private notificationService: NotificationService,
        private cacheService: CacheService) { }


    ngOnInit(): void {
        const cachedCategories = this.cacheService.getCachedObject(this.cacheCategories);

        if (cachedCategories) {
            this.categories = cachedCategories;
            return;
        }

        this.subscription$ = this.JokesService.getCategories().subscribe((result) =>
            this.fetchCategories(result),
            (error) => {
                this.notificationService.failure(`Some errors occure, please try again ${error}`);
                console.error(`Here we can call some functionality to log errors`);
            });
    }

    getJokeDetailsBy(category: Category): void {
        this.dataSharedService.changeMessage(category);
        this.router.navigateByUrl('Jokes/Joke');
    }

    private fetchCategories(categories: Categories): void {
        if (categories) {
            this.categories = categories.Categories;
            this.cacheService.setObjectCache(this.cacheCategories, categories.Categories);
            this.notificationService.success(`Categories fetched succesfully`);
        } else {
            this.notificationService.failure(`Unfortunately we could not fetch data, please try again later`);
            console.warn(`Here we can call some functionality to log errors`);
        }
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}
