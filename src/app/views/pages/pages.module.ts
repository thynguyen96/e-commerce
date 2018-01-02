import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { loginMocktest } from 'app/_mocktest/LoginInterceptor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { prodcutRes } from 'app/_mocktest/ProductRest';
import { BlogComponent } from './blog/blog.component';
import { CategoryRes } from 'app/_mocktest/CategoryRes';
import { StoreFrontComponent } from './store-front/store-front.component';
import { ProductsDataService } from 'app/_service/__products.services';
import { StorageService, LocalStorageServie } from 'app/_service/__storage.service';
import { DeliveryOptionsDataService } from 'app/_service/__delivery-options.service';
import { ShoppingCartService } from 'app/_service/__shopping-cart.services';
import { CheckoutComponent } from 'app/views/pages/checkout/checkout.component';
import { OrderConfirmationComponent } from 'app/views/pages/order-confirmation/order-confirmation.component';
import { ShoppingCartComponent } from 'app/views/pages/shopping-cart/shopping-cart.component';
import { HeaderComponent2 } from 'app/views/pages/header/header.component';
import { PagesComponent } from 'app/views/pages/pages.component';
import { FooterComponent2 } from 'app/views/pages/footer/footer.component';

@NgModule({
  imports: [PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  
  declarations: [
    PagesComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BlogComponent,
    StoreFrontComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    ShoppingCartComponent,
    HeaderComponent2,
    FooterComponent2
  ]
  , providers: [
    loginMocktest,
    prodcutRes,
    CategoryRes,
    ProductsDataService,
    DeliveryOptionsDataService,
   
    { provide: StorageService, useClass: LocalStorageServie },
    {
      deps: [StorageService, ProductsDataService, DeliveryOptionsDataService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
    
  ]
})
export class PagesModule { }
