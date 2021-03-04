import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { McBreadcrumbsModule } from '../library/mc-breadcrumbs';
import { ThemeModule } from '../@theme/theme.module';
import { NgnRoutingModule } from './ngn-routing.module';
import { NgnComponent } from './ngn.component';

/**
 * Root Module for NGN Project
 * All NGN Modules will be inside this module folder
 */
@NgModule({
  imports: [
    CommonModule,
    NgnRoutingModule,
    ThemeModule.forRoot(),
    McBreadcrumbsModule.forRoot(),
  ],
  declarations: [NgnComponent]
})
export class NgnModule { }
