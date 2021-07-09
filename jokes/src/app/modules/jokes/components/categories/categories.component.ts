import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Categories, Category } from '../../models/categories.model';
import { DataSharedService } from '../../services/data-shared.service';
import { NotificationService } from '../menu-notification-bar/menu-notification.service'
import { IJokesService } from '../../services/jokes.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})

export class CategoriesComponent implements OnInit, OnDestroy {

    private subscription$: Subscription = new Subscription;
    categories: Category[] = [];
    
    constructor(private JokesService: IJokesService,
        private DataSharedService: DataSharedService,
        private router: Router,
        private NotificationService: NotificationService) { }


    ngOnInit(): void {
        this.subscription$ = this.JokesService.getCategories().subscribe(
            (result: Categories) => {
                if (result) {
                    this.categories = result.Categories;
                    this.NotificationService.showSuccessNotification('Categories fetched succesfully');
                }
            },
            (error) => {
                this.NotificationService.showErrorNotification(`Some errors occure, please try again ${error}`);
                console.error('Here we can call some functionality to log errors')
            }
        );
    }

    getJokeDetailsBy(category: Category): void {
        this.DataSharedService.changeMessage(category);
        this.router.navigateByUrl('Jokes/Joke');
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}