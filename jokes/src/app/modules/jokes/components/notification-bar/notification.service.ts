import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from './../../models/notification.model';

@Injectable()
export class NotificationService {
    private notification = new Subject<Notification>();
    notificationMessage = this.notification.asObservable();

    success(informationMessage: string) {
        this.notification.next(new Notification(informationMessage, false));
    }

    failure(informationMessage: string) {
        this.notification.next(new Notification(informationMessage, true));
    }
}
