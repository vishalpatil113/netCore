import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, CarouselModule, AccordionModule, TabsModule } from 'ngx-bootstrap';
import { ConversionTrackingComponent } from './conversion-tracking/conversion-tracking.component';
import { BpnCampaignService } from 'src/app/shared/bpn/services/bpn-campaign.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const COMPONENTS = [
  ConversionTrackingComponent,
];

const MODULES = [
  // System Modules
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  // Thirdparty Modules
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
  ],
  providers: [
    BpnCampaignService,
  ]
})
export class SharedModule { }
