import { Categories, Category } from '../models/categories.model';

export class CoreCategoriesMapper {
    StringsArrayToCategories(categoriesResult: string[]): Categories {
        const coreCategories = categoriesResult
            .map<Category>(categoryStringValue => new Category(categoryStringValue));
        return new Categories(coreCategories);
    }
}
