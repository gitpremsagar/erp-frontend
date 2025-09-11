import { RootState } from '@/redux/store';
import { Category } from '@/lib/types/categories/Category.type';
import { SubCategory } from '@/lib/types/subCategories/SubCategory.type';
import { ProductTag } from '@/lib/types/products/ProductTag.type';

export const getCategoryById = (state: RootState, id: string): Category | undefined => {
  return state.categories.categories.find(category => category.id === id);
};

export const getSubCategoryById = (state: RootState, id: string): SubCategory | undefined => {
  return state.subCategories.subCategories.find(subCategory => subCategory.id === id);
};

export const getProductTagById = (state: RootState, id: string): ProductTag | undefined => {
  return state.productTags.productTags.find(tag => tag.id === id);
};

export const getSubCategoriesByCategoryId = (state: RootState, categoryId: string): SubCategory[] => {
  return state.subCategories.subCategories.filter(subCategory => subCategory.categoryId === categoryId);
};

export const getCategoryName = (state: RootState, id: string): string => {
  const category = getCategoryById(state, id);
  return category?.name || 'Unknown Category';
};

export const getSubCategoryName = (state: RootState, id: string): string => {
  const subCategory = getSubCategoryById(state, id);
  return subCategory?.name || 'Unknown Sub-Category';
};

export const getProductTagName = (state: RootState, id: string): string => {
  const tag = getProductTagById(state, id);
  return tag?.name || 'Unknown Tag';
};
