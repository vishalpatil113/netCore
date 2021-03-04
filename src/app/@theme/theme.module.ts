import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgnMenuItemComponent } from './components/main-menu/menu-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgnMenuService, NgnMenuInternalService } from './components/main-menu/menu.service';

const COMPONENTS = [
  MainLayoutComponent,
  HeaderComponent,
  MainMenuComponent,
  NgnMenuItemComponent,
  FooterComponent,
];

const NGN_MENU_PROVIDERS = [NgnMenuService, NgnMenuInternalService];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {

    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NGN_MENU_PROVIDERS
      ]
    };
  }
}
