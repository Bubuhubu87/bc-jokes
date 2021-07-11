import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Categories } from '../../models/categories.model';
import { DataSharedService } from '../../services/data-shared.service';
import { NotificationService } from '../notification-bar/notification.service';
import { IJokesService } from '../../interfaces/jokes.interface';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache.service';
import { Category } from '../../models/category.model';
import { CategoriesTexts } from '../../const_strings/categories.text';
import { RoutingStrings } from '../../const_strings/routings.string';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit, OnDestroy {
    private subscription$: Subscription = new Subscription;
    categories: Category[] = [];

    constructor(private JokesService: IJokesService,
        private dataSharedService: DataSharedService,
        private router: Router,
        private notificationService: NotificationService,
        private cacheService: CacheService) { }


    ngOnInit(): void {
        const cachedCategories = this.cacheService.getCachedObject(CategoriesTexts.CATEGORIES);

        if (cachedCategories) {
            this.categories = cachedCategories;
            return;
        }

        this.subscription$ = this.JokesService.getCategories().subscribe((result) =>
            this.fetchCategories(result),
            (error) => {
                this.notificationService.failure(`${CategoriesTexts.NOTIFY_FAILURE} ${error}`);
                console.error(CategoriesTexts.LOG_ERROR_TO_DB);
            });
    }

    getJokeDetailsBy(category: Category): void {
        this.dataSharedService.changeMessage(category);
        this.router.navigateByUrl(RoutingStrings.JOKES_JOKE);
    }

    private fetchCategories(categories: Categories): void {
        if (categories) {
            this.categories = categories.Categories;
            this.cacheService.setObjectCache(CategoriesTexts.CATEGORIES, categories.Categories);
            this.notificationService.success(CategoriesTexts.NOTIFY_SUCCESS);
        } else {
            this.notificationService.failure(CategoriesTexts.NOTIFY_FAILURE_FETCH_DATA);
            console.warn(CategoriesTexts.LOG_ERROR_TO_DB);
        }
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}
