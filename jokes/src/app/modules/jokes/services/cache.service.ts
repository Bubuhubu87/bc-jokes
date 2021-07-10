import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class CacheService {

    setObjectCache(key: string, value: object): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getCachedObject(key: string): any {
        const value = sessionStorage.getItem(key);
        if (value)
            try {
                return JSON.parse(value);
            } catch (error) {
                console.error(`Something went wrong with item parse in ${this.getCachedObject.name} ${error}`);
                return null;
            }
    }
}