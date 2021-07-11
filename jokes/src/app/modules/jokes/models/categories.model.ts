import { Category } from './category.model';

export class Categories {
    Categories: Category[] = [];

    constructor(category: Category[]) {
        this.Categories = category;
    }
}
