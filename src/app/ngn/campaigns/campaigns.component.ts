import { Component} from '@angular/core';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'ngn-campaigns',
  templateUrl: './campaigns.component.html',
  styles: []
})
export class CampaignsComponent {
  allChannels = allActiveChannels;
  environment = environment;
}
