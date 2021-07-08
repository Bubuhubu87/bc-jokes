export class Categories {
    Categories: Category[];

    constructor(categories: Category[]) {
        this.Categories = categories;
    }
}

export class Category {
    Name: string;
    constructor(name: string) {
        this.Name = name;
    }
}