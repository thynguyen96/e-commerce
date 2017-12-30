import { NgModule } from '@angular/core';

import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from './modals.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Components Routing
import { ComponentsRoutingModule } from './components-routing.module';

import { ThemSanPhamComponent } from './them-san-pham.component';
import { CommonModule } from '@angular/common/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { prodcutRes } from 'app/_mocktest/ProductRest';
import { loginMocktest } from 'app/_mocktest/LoginInterceptor';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule,
    HttpClientModule
  ],
  declarations: [
    ButtonsComponent,
    CardsComponent,
    FormsComponent,
    ModalsComponent,
    SocialButtonsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    ThemSanPhamComponent
  ]
  , providers: [
    loginMocktest,
    prodcutRes
  ]
})
export class ComponentsModule { }
