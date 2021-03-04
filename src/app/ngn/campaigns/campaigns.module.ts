import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalModule } from 'ngx-modialog';
import { CarouselModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule
  ],
  declarations: [CampaignsComponent]
})
export class CampaignsModule { }
