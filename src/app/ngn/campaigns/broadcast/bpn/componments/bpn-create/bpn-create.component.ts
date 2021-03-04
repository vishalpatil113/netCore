import { Component } from '@angular/core';
import { BpnCampaign, Payload, Website } from '../../../../../../shared/bpn/interfaces/bpn-campaign-list.model';

@Component({
  selector: 'ngn-bpn-create',
  templateUrl: './bpn-create.component.html',
  styleUrls: ['./bpn-create.component.scss'],
})
export class BpnCreateComponent {
  campaignName: any;
  bpnCampaign: BpnCampaign;
  website: Website;
  summaryPayload: Payload[];
 
  constructor() {
    this.bpnCampaign = new BpnCampaign();
    this.website = new Website();
  }
  displayCampaignName($event) {
   
    this.bpnCampaign.name = $event.campainName;
    this.website.siteurl = $event.siteurl
  }
  summaryEvent($event) {
    this.summaryPayload = $event;
  }
  
}
