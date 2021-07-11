import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class DataSharedService {
    private messageSource = new ReplaySubject<Category>(1);
    currentMessage = this.messageSource.asObservable().pipe(shareReplay(1));

    changeMessage(message: Category) {
        this.messageSource.next(message);
    }
}
