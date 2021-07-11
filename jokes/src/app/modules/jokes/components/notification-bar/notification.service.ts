import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    animationDuration = 3000;

    success(informationMessage: string) {
        this.ShowNotification(false, informationMessage);
    }

    failure(informationMessage: string) {
        this.ShowNotification(true, informationMessage);
    }

    private ShowNotification(isError: boolean, informationMessage: string) {
        const container = document.getElementById('saveChanges');
        if (container) {
            container.classList.add('absolute');

            const cloneContainer = container.cloneNode(true) as HTMLElement;
            const notificationBar = cloneContainer.firstElementChild as HTMLElement;
            const notificationMessage = notificationBar.firstElementChild;

            notificationBar.classList.add(isError ? 'error' : 'success');
            notificationBar.style.animationDuration = `${this.animationDuration}ms`;

            if (notificationMessage) {
                notificationMessage.innerHTML = informationMessage;
            }

            container.appendChild(notificationBar);
            container.hidden = false;
            setTimeout(() => {
                container.hidden = true;
                container.removeChild(notificationBar);
            }, this.animationDuration);
        }
    }
}
