import { createConnection } from "typeorm";
import { Category } from "./src/database/entity/category";
import { Item } from "./src/database/entity/items";

import SeedData from "./seedData";


const seedCategory = async () => {

    await createConnection(
        {
            type: "mysql",
            host: "81.16.28.27",
            port: 3306,
            username: "u663788736_aman",
            password: "adfoodio@B01",
            database: "u663788736_adfoodio",
            entities: [Category, Item],
            synchronize: true,
        }).then(async connection => {

            SeedData.forEach( async category => {
                let _newCategory = new Category();
                _newCategory['name'] = category.name
                _newCategory = await connection.manager.save(_newCategory)

                category.categoryItems.forEach(async categoryItem => {
                    const _newCategoryItem = new Item();
                    _newCategoryItem['name'] = categoryItem['name'];
                    _newCategoryItem['price'] = categoryItem['price'];
                    _newCategoryItem['category'] = _newCategory
                      console.log("saved !!")
                    return await connection.manager.save(_newCategoryItem);
                })
               
            })
        }).catch(error => {
            return console.error(error)
        });
    return 0;
}


seedCategory()