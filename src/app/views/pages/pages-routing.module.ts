import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { HomeComponent } from './home.component';
import { BlogComponent } from './blog/blog.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { CheckoutComponent } from 'app/views/pages/checkout/checkout.component';
import { OrderConfirmationComponent } from 'app/views/pages/order-confirmation/order-confirmation.component';
import { PagesComponent } from 'app/views/pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    data: {
      title: 'Example Pages'
    },
    children: [
      // {
      //   path: '',
      //   component: PagesComponent,
      //   data: {
      //     title: 'Home'
      //   }
      // },
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'Blog Page'
        }
      },
      {
        path: '',
        component: StoreFrontComponent,
        data: {
          title: 'Store Front Page'
        }
      },
      {
        // canActivate: [PopulatedCartRouteGuard],
        component: CheckoutComponent,
        path: "checkout"
    },
    {
        // canActivate: [PopulatedCartRouteGuard],
        component: OrderConfirmationComponent,
        path: "confirmed"
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
