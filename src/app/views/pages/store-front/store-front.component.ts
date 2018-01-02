import { ChangeDetectionStrategy,Component , OnInit} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Product } from '../../../_models/product.model';
import { ProductsDataService } from 'app/_service/__products.services';
import { ShoppingCartService } from 'app/_service/__shopping-cart.services';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-store-front",
    templateUrl: 'store-front.component.html',
    styleUrls: ['store-front.component.scss']
})
export class StoreFrontComponent implements OnInit {

    public products: Observable<Product[]>;

    public constructor(private productsService: ProductsDataService,
        private shoppingCartService: ShoppingCartService) {
    }

    public addProductToCart(product: Product): void {
        this.shoppingCartService.addItem(product, 1);
    }

    public removeProductFromCart(product: Product): void {
        this.shoppingCartService.addItem(product, -1);
    }

    public productInCart(product: Product): boolean {
        return Observable.create((obs: Observer<boolean>) => {
            const sub = this.shoppingCartService
                .get()
                .subscribe((cart) => {
                    obs.next(cart.items.some((i) => i.productId === product.id));
                    obs.complete();
                });
            sub.unsubscribe();
        });
    }

    public ngOnInit(): void {
        this.products = this.productsService.all();
    }


}
