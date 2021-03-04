import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../../../shared/shared.module';
import { BpnRoutingModule } from './bpn-routing.module';
import { BpnCreateComponent } from './componments/bpn-create/bpn-create.component';
import { BpnSetupComponent } from './componments/bpn-setup/bpn-setup.component';
import { FormsModule } from '@angular/forms';

  /** Import theme */
import { BpnCampaignService } from 'src/app/shared/bpn/services/bpn-campaign.service';
import { BpnServiceConstants } from 'src/app/shared/bpn/services/bpn-service-constants';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BpnRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    BpnCreateComponent,
    BpnSetupComponent,
  ],
  providers: [
    BpnCampaignService,
    BpnServiceConstants,
  ]
})
export class BpnModule {}
