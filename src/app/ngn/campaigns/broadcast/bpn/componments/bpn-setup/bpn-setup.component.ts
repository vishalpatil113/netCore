import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpnBaseService } from '../../../../../../services/bpn-base.service';
import { Payload, Website } from '../../../../../../shared/bpn/interfaces/bpn-campaign-list.model';
import { BpnCampaignService } from '../../../../../../shared/bpn/services/bpn-campaign.service';

@Component({
  selector: 'ngn-bpn-setup',
  templateUrl: './bpn-setup.component.html',
  styleUrls: ['./bpn-setup.component.scss']
})
export class BpnSetupComponent implements OnInit {
  campaignForm: FormGroup;
  submitted: boolean = false;
  websites: Website[];
  conversionTracking: boolean = true;
  summaryPayload: Payload[];
  @Output() displayCampaignName = new EventEmitter();
  @Output() summaryEvent = new EventEmitter();
  constructor(private fb: FormBuilder, private _api: BpnCampaignService) {

  }
  ngOnInit() {
   
    this.craeteCampaignForm();
    this._api.getWebsite().subscribe(w => {
      this.websites = new Array();
      this.websites = w.data
    })

  }
  craeteCampaignForm() {
    this.campaignForm = this.fb.group({
      siteId: [''],
      siteurl:[],
      campiagnName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_&@:?,]{0,100}")]]
    });
  }
  get formControls() {
    return this.campaignForm.controls;
  }
  saveCampaign() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.campaignForm.invalid) {
      return;
    }
    let palyload = {
      campainName: this.campaignForm.controls['campiagnName'].value,
      siteurl: this.campaignForm.controls['siteurl'].value

    }
    this.displayCampaignName.emit(palyload)
  }
  isConversionTracking(event) {
    if (!event.target.checked) {
      this.conversionTracking = false;
    }
    else {
      this.conversionTracking = true;
    }
  }
  selectWebsite(site: any) {
    let pay = this.websites.find(w => w.id == Number(site.currentTarget.value));
    this.campaignForm.controls['siteurl'].setValue(pay.siteurl);

  }
  summary($event) {
   
    this.summaryPayload = $event
    this.summaryEvent.emit(this.summaryPayload )
  }
}

