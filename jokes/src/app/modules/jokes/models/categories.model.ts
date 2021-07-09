export class Categories {
    Categories: Category[] = [];

    constructor(category: Category[]) {
        this.Categories = category;
    }
}

export class Category {
    Name: string;
    constructor(name: string) {
        this.Name = name;
    }
}