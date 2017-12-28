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

@NgModule({
  imports: [ PagesRoutingModule,
    CommonModule ,
    ReactiveFormsModule,
    FormsModule,
  HttpClientModule ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ]
  ,providers : [
    loginMocktest,
    prodcutRes
  ]
})
export class PagesModule { }
