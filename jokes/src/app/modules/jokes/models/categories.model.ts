import { Category } from './category.model';

export class Categories {
    categories: Category[] = [];

    constructor(category: Category[]) {
        this.categories = category;
    }
}
