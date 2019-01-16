import { Category } from './category';

export class RegistryItem {
    _id: number
    title: string
    description?: string
    userRegistered: string
    priority: number
    category: Category
}