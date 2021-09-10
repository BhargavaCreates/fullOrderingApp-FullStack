import {getRepository} from "typeorm";
import { Item } from '@entity/items';
import { Category } from "@entity/category";
import SeedData from "seedData";

export const getItems = async () => {
    try {
        const itemsRepository = await getRepository(Item);
        const items = await itemsRepository.find({ relations: ["category"] })
        return (items)  
    } catch (error) {
        console.error(error)
    }
}

export const getCategories = async () => {
    try {
        const categoryRepository = getRepository(Category);
        const categories = await categoryRepository.find();
        return categories;
    } catch (error) {
        console.error(error)
    }
}

