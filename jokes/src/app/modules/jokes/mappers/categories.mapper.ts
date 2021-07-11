import { Categories } from '../models/categories.model';
import { Category } from '../models/category.model';

export class CoreCategoriesMapper {
    StringsArrayToCategories(categoriesResult: string[]): Categories {
        const coreCategories = categoriesResult
            .map<Category>(categoryStringValue => new Category(categoryStringValue));
        return new Categories(coreCategories);
    }
}
