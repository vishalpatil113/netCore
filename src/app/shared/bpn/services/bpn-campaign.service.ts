import { Injectable } from '@angular/core';
// import { ApiService } from '../../../../../services';
import { ApiService } from 'src/app/services';
import { recursiveDeepCopy } from 'src/app/libs/utils';

import { BpnServiceConstants } from './bpn-service-constants';
import {
  BpnCampaign,
  BpnCampaignDetails,
  BpnTemplateDetails
} from '../interfaces/bpn-campaign-list.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BpnCampaignService {
  public savedCampaignDetails: BpnCampaignDetails;
  public campaignDetails: BpnCampaignDetails = new BpnCampaignDetails();
  public savedTemplateDetails: BpnTemplateDetails;
  public templateDetails: BpnTemplateDetails = new BpnTemplateDetails();
  public jsonError: any;
  public selectedTabIndex = 0;
  public activities = [];
  public payloads = [];

  private _selectedTabIndex = new BehaviorSubject<number>(0);

  constructor(private api: ApiService, private _http: HttpClient) {}

  public getSelectedTabIndex() {
    return this._selectedTabIndex;
  }

   tabReset() {
    this.campaignDetails = recursiveDeepCopy(this.savedCampaignDetails);
  }

  moveToNextTab() {
    this.selectedTabIndex += 1;
    if (this.selectedTabIndex > 3) {
      this.selectedTabIndex = 3;
    }
    if (
      this.selectedTabIndex === 0 ||
      (this.selectedTabIndex === 1 &&
        this.campaignDetails.audienceTab === true) ||
      (this.selectedTabIndex === 2 &&
        this.campaignDetails.contentTab === true) ||
      (this.selectedTabIndex === 3 && this.campaignDetails.scheduleTab === true)
    ) {
      this.tabReset();
      this._selectedTabIndex.next(this.selectedTabIndex);
    }
  }

  getCampaignList(params = {}) {
    return this.api.get(BpnServiceConstants.GetCampaignList, params, {
      operation: 'Bpn:getCampaignList',
      result: {}
    });
  }

  getTags() {
    return this.api.get(
      BpnServiceConstants.GetTagMaster + '?channel=all',
      {},
      {
        operation: 'Bpn:GetTags',
        result: {}
      }
    );
  }

  getCampaignDetails(params: {}) {
    this._selectedTabIndex.next(0);
    return this.api.get(BpnServiceConstants.GetCampaignDetails, params, {
      operation: 'Bpn:getCampaignDetails',
      result: {}
    });
  }

  getWebsites(params = {}) {
    return this.api.get(BpnServiceConstants.GetWebsite, params);
  }

  getAllUsersCount(params = {}) {
    return this.api.get(BpnServiceConstants.GetAllUsersCount, params);
  }

  getAllSegments(params) {
    return this.api.get(BpnServiceConstants.GetAllSegments, params);
  }

  saveCampaign(params: any) {
    return this.api.post(BpnServiceConstants.SaveCampaign, params);
  }

  getTargetedUsersCount(params) {
    return this.api.get(BpnServiceConstants.GetAudienceCountByWeb, params);
  }

  getEnableFrequencyCampaignFlag() {
    return this.api.get(BpnServiceConstants.GetEnableFrequencyCampaignFlag);
  }


  GetFrequencyEnableFlag(param: any = {}) {
    return this.api.get(BpnServiceConstants.GetFrequencyEnableFlag, param);
  }

  saveFile(params: any) {
    return this.api.upload(BpnServiceConstants.SaveFile, params);
  }

  getCategories(params = {}) {
    return this.api.get(BpnServiceConstants.GetCategories, params);
  }

  getTemplates(params = {}) {
    return this.api.get(BpnServiceConstants.GetTemplates, params);
  }

  moveToNextTabTemplate() {
    this.selectedTabIndex += 1;
    if (this.selectedTabIndex > 1) {
      this.selectedTabIndex = 1;
    }
    if (
      this.selectedTabIndex === 0 ||
      (this.selectedTabIndex === 1 && this.templateDetails.contentTab === true)
    ) {
      this.tabReset();
      this._selectedTabIndex.next(this.selectedTabIndex);
    }
  }

  getTemplateDetails(params: {}) {
    // this._selectedTabIndex.next(0);
    return this.api.get(BpnServiceConstants.GetTemplateDetails, params, {
      operation: 'Bpn:GetTemplateDetails',
      result: {}
    });
  }

  checkTemplateNameExists(params) {
    return this.api.post(
      BpnServiceConstants.CheckTemplateNameExists,
      params,
      '',
      {
        operation: 'Bpn:CheckTemplateNameExists',
        result: {}
      }
    );
  }

  getEditTemplateConfirm(params = {}) {
    return this.api.get(BpnServiceConstants.GetEditConfirm, params);
  }

  saveTemplate(params: any) {
    return this.api.post(BpnServiceConstants.SaveTemplate, params);
  }

  getStatusMapping(params = {}) {
    return this.api.get(BpnServiceConstants.GetStatusMapping, params, {
      operation: 'Bpn:GetStatusMapping',
      result: {}
    });
  }

  getStatusCount(params = {}) {
    return this.api.get(BpnServiceConstants.GetStatusCount, params, {
      operation: 'Bpn:getStatusCount',
      result: {}
    });
  }

  cloneCampaign(params = {}) {
    return this.api.get(
      BpnServiceConstants.CloneCampaign,
      params,
      {
        operation: 'Bpn:cloneCampaign',
        result: {}
      }
    );
  }

  suspendCampaign(campaign: BpnCampaign) {
    return this.api.get(
      BpnServiceConstants.SuspendCampaign + campaign.id,
      {},
      {
        operation: 'Bpn:suspendCampaign',
        result: {}
      }
    );
  }

  getRecentTokens(params) {
    return this.api.get(BpnServiceConstants.GetRecentTokens + params);
  }

  saveCampaignWithFormData(params: any) {
    return this.api.postFormData(BpnServiceConstants.SaveCampaign, params);
  }


  setSentCount() {
    const totalUser =
      this.campaignDetails.target_audience === 'all'
        ? +this.campaignDetails.getTargetedUsersCount
        : +this.campaignDetails.total_users;

    let remainningTotal = totalUser;
    for (const index in this.campaignDetails.contents) {
      if (
        (totalUser && this.campaignDetails.target_audience === 'all') ||
        (this.campaignDetails.target_audience === 'segment' &&
          this.campaignDetails.segments.length === 1)
      ) {
        let total = Math.round(
          totalUser * (+this.campaignDetails.contents[index].distribution / 100)
        );
        if (this.campaignDetails.contents.length - 1 === +index &&
          this.campaignDetails.split_type === 'split') {
            total = remainningTotal;
        }
        if (total === 0 && remainningTotal > 0) {
          total = 1;
        } else if (total >= remainningTotal) {
          total = remainningTotal;
        }
        this.campaignDetails.contents[index].sentcount = total;
        remainningTotal -= total;
      } else {
        this.campaignDetails.contents[index].sentcount = 0;
      }
    }
  }

  sendNotification(params) {
    return this.api.post(BpnServiceConstants.SendTestBpn, params, 'formdata');
  }
  getWebsite(): Observable<any> {

    return this._http.get('http://localhost:5000/websites')
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getPayloads(): Observable<any> {

    return this._http.get('http://localhost:5000/activities')
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
