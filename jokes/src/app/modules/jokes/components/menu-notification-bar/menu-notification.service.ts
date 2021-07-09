import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    animationDuration = 3000;

    showSuccessNotification(informationMessage: string) {
        this.ShowNotification(false, informationMessage);
    }

    showErrorNotification(informationMessage: string) {
        this.ShowNotification(true, informationMessage);
    }

    private ShowNotification(isError: boolean, informationMessage: string) {
        const container = document.getElementById('saveChanges');
        if (container) {
            container.classList.add("absolute");

            const cloneContainer = <HTMLElement>container.cloneNode(true);
            const notificationBar = <HTMLElement>cloneContainer.firstElementChild;
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
