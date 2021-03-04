import { Injectable } from '@angular/core';

declare var clientid: any;
declare var instance_name: any;
declare var base_url: any;
declare var site_url: any;
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
    public siteId: any;
    clientid = clientid;
    paneldata = {
        instance_name: instance_name,
        clientid: clientid,
        base_url: base_url,
        site_url: site_url,
        trackingid: '',
        cms_shopify_api_key: '',
        cms_shopify_redirect_uri: ''
    };

    optin_type: 'single';

    website = {
        id: null,
        cid: '',
        siteid: '',
        siteurl: '',
        type: 'https',
        domainSaved: false,
        subdomain: '',
        auth_key: '',
        apikey: '',
        sender_id: '',
        fcm_enabled: 0,
        apns_enabled: 0,
        bpn_enabled: 0,
        geo_enabled: '0',
	activity_enabled: 1,
	js_enabled: 1,
        p12file: '',
        ios_p12: '',
        ios_pass: '',
        apns_website_id: '',
        apns_fileupload_path: '',
        p12filename: '',
        useForPush: 0,
        optin_type: 'single',
        multisite: '',
        p12FileChanged: false,
        cms_type: '',
        cms_store_name: '',
        cms_status: 0
    };

    websiteTabs = {
        showbpnSetting: false,
        showSetting: true,
        showCustomNoti: false,
        showOptinRule: false,
        showAck: false
    };

    public getBaseUrl = (): string => {
        return this.paneldata.base_url;
    }

    public getSiteUrl = (): string => {
        return this.paneldata.site_url;
    }

    public setSiteId = (value): any => {
        this.siteId = value;
    }

    public getSiteId = () => {
        return this.siteId;
    }

    public getClientId = () => {
        return this.clientid;
    }

    public getTrackingId = (): string => {
      return this.paneldata.trackingid;
    }

    public getShopifyApiKey = (): string => {
      return this.paneldata.cms_shopify_api_key;
    }

    public getShopifyRedirectUri = (): string => {
      return this.paneldata.cms_shopify_redirect_uri;
    }
};

