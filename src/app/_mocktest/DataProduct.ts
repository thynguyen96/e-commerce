import { Product } from "app/_mocktest/product";

export class DataProduct {
   listProducts: any =[];
   constructor () {
       for ( let i  = 0  ; i < 100 ; i ++ ){
           let p = new Product() ;
           p.name =  `San pham ${i} `
           p.type = 'PM'
           p.price  = i ;
           this.listProducts.push(p);
       }
   } 
}