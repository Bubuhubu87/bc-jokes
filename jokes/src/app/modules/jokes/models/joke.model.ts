export class Joke {
    IconUrl: string;
    Id: number;
    Url: string;
    Value: string;

    constructor(iconUrl: string, id: number, url: string, value: string) {
        this.IconUrl = iconUrl;
        this.Id = id;
        this.Url = url;
        this.Value = value;
    }
}