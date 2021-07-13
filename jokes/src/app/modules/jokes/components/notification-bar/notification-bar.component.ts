import { Component, OnDestroy } from '@angular/core';
import { Subscription, } from 'rxjs';
import { NotificationService } from './notification.service';
import { Notification } from './../../models/notification.model';

@Component({
    selector: 'app-notification-bar',
    templateUrl: './notification-bar.component.html',
    styleUrls: ['./notification-bar.component.scss']
})

export class NotificationBarComponent implements OnDestroy {

    hidden = true;
    notification!: Notification;
    animationDuration = 3000;

    private subscription = new Subscription();

    constructor(private notificationService: NotificationService) {
        this.subscription = this.notificationService.notificationMessage.subscribe((result: Notification) => {
            this.notification = result;
            this.showNotificationBar();
        });
    }

    private showNotificationBar(): void {
        this.hidden = false;
        setTimeout(() => {
            this.hidden = true;
        }, this.animationDuration);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}