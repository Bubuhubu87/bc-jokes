export class Joke {
    iconUrl: string;
    id: number;
    url: string;
    value: string;

    constructor(iconUrl: string, id: number, url: string, value: string) {
        this.iconUrl = iconUrl;
        this.id = id;
        this.url = url;
        this.value = value;
    }
}