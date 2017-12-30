import { Product } from "app/_mocktest/product";

export class DataProduct {
   listProducts: any =[];
   constructor () {
       for ( let i  = 0  ; i < 15 ; i ++ ){
           let p = new Product() ;
           p.id = i;
           p.name =  `San pham ${i} `
           p.quality = 'PM'
           p.price  = `${i}đ/kg` ;
           p.type = i;
           this.listProducts.push(p);
       }
   } 
}