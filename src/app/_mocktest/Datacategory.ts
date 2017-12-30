import { category } from "app/_mocktest/category";
import { Product } from "app/_mocktest/product";

export class Datacategory {
    listCategory: category[] = [];
    constructor() {
        const listName = ['danh muc 1', 'danh muc 2 ', 'danh muc 3'];
        for (let i = 0; i < listName.length; i++) {
            const temp = new category();
            temp.name = listName[i];
            temp.id = i;
            const listProducts:Product[] = []; //cho nay phuc tap vay :v typescipt ak
            for (let i = 0; i < 15; i++) {
                let p = new Product();
                p.id = i;
                p.name = `San pham ${i} `
                p.quality = 'PM'
                p.price = `${i}đ/kg`;
                p.type = i;
                listProducts.push(p);
            }
            temp.listProduct = listProducts ;
            this.listCategory.push(temp);
        }
    }
    public getcategoryByID(id: number) {
        return this.listCategory[id];
    }
}
