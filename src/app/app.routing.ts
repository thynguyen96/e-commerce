import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from './_service/Auth';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent,
  LoginLayoutComponent,
  RegisterLayoutComponent
} from './containers';
import { loginMocktest } from 'app/_mocktest/LoginInterceptor';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        // canActivate: [Auth]
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: RegisterLayoutComponent,
    data: {
      title: 'Register'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  // providers: [],
  providers: [Auth 
   
  ],
})
export class AppRoutingModule {}
