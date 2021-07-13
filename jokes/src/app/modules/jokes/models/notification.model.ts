export class Notification {
    text: string;
    isError: boolean;

    constructor(text: string, isError: boolean) {
        this.text = text;
        this.isError = isError;
    }
}