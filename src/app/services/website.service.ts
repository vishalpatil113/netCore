import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GlobalsService } from './globals.service';
import { Common } from '../libs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

    constructor(
        private apiService: ApiService,
        private globalsService: GlobalsService,
        private common: Common,
    ) { }

    getSiteId() {
        return this.globalsService.website.siteid;
    }

    getDomain() {
        return this.globalsService.website.siteurl;
    }

    getOptType() {
        return this.globalsService.website.optin_type;
    }

    getClientId() {
        return this.globalsService.clientid;
    }

    getFontFamilies() {
        const fontFamilies = [
            { 'name': 'Arial', 'fontFamily': 'Arial' },
            { 'name': 'Times New Roman', 'fontFamily': 'Times New Roman' },
            { 'name': 'Open sans', 'fontFamily': 'Open sans' },
            { 'name': 'verdana', 'fontFamily': 'verdana' }
        ];
        return fontFamilies;
    }

    getFontSizes() {
        const fontSizes = [
            { 'name': '12px', 'fontSize': '12px' },
            { 'name': '14px', 'fontSize': '14px' },
            { 'name': '16px', 'fontSize': '16px' },
        ];
        return fontSizes;
    }


    getFontStyles() {
        const fontStyles = [
            { 'name': 'normal', 'fontStyle': 'normal', 'fontWeight': '' },
            { 'name': '', 'fontStyle': 'italic', 'fontWeight': '' },
            { 'name': '', 'fontStyle': '', 'fontWeight': 'bold' },
            { 'name': '', 'fontStyle': 'italic', 'fontWeight': 'bold' }
        ];
        return fontStyles;
    }

    /**
     * This function returns allignment types
     * @returns alignments
     */
    getAlignments() {
        const alignments = [
            { 'align': 'left' },
            { 'align': 'center' },
            { 'align': 'right' }
        ];
        return alignments;
    }


    /**
     *  This function returns Notification Placement JSON
     */
    getPlacementOptions() {
        const placements = {
            'tl': { //1. Top Left
                'style': {
                    'top': '15',
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': '15',
                    'transform': 'none',
                    'topUnit': 'px',
                    'rightUnit': '',
                    'bottomUnit': '',
                    'leftUnit': 'px'
                },
                'showTop': true,
                'showRight': false,
                'showBottom': false,
                'showLeft': true
            },
            'tc': { //2. Top Center
                'style': {
                    'top': '15',
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': '50',
                    'transform': 'translateX(-50%)',
                    'topUnit': 'px',
                    'rightUnit': '',
                    'bottomUnit': '',
                    'leftUnit': '%'
                },
                'showTop': true,
                'showRight': false,
                'showBottom': false,
                'showLeft': false
            },
            'tr': { //3.Top Right
                'style': {
                    'top': '15',
                    'right': '15',
                    'bottom': 'auto',
                    'left': 'auto',
                    'transform': 'none',
                    'topUnit': 'px',
                    'rightUnit': 'px',
                    'bottomUnit': '',
                    'leftUnit': ''
                },
                'showTop': true,
                'showRight': true,
                'showBottom': false,
                'showLeft': false
            },
            'ml': { //4.Middle Left
                'style': {
                    'top': '50',
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': '15',
                    'transform': 'translateY(-50%)',
                    'topUnit': '%',
                    'rightUnit': '',
                    'bottomUnit': '',
                    'leftUnit': 'px'
                },
                'showTop': false,
                'showRight': false,
                'showBottom': false,
                'showLeft': true
            },
            'mc': { //5.Middle Center
                'style': {
                    'top': '50',
                    'right': 'auto',
                    'bottom': 'auto',
                    'left': '50',
                    'transform': 'translate(-50%, -50%)',
                    'topUnit': '%',
                    'rightUnit': '',
                    'bottomUnit': '',
                    'leftUnit': '%'
                },
                'showTop': false,
                'showRight': false,
                'showBottom': false,
                'showLeft': false
            },
            'mr': { //6.Middle Right
                'style': {
                    'top': '50',
                    'right': '15',
                    'bottom': 'auto',
                    'left': 'auto',
                    'transform': 'translateY(-50%)',
                    'topUnit': '%',
                    'rightUnit': 'px',
                    'bottomUnit': '',
                    'leftUnit': ''
                },
                'showTop': false,
                'showRight': true,
                'showBottom': false,
                'showLeft': false
            },
            'bl': { //7.Bottom Left
                'style': {
                    'top': 'auto',
                    'right': 'auto',
                    'bottom': '15',
                    'left': '15',
                    'transform': 'none',
                    'topUnit': '',
                    'rightUnit': '',
                    'bottomUnit': 'px',
                    'leftUnit': 'px'
                },
                'showTop': false,
                'showRight': false,
                'showBottom': true,
                'showLeft': true
            },
            'bc': { //8.Bottom Center
                'style': {
                    'top': 'auto',
                    'right': 'auto',
                    'bottom': '15',
                    'left': '50',
                    'transform': 'translateX(-50%)',
                    'topUnit': '',
                    'rightUnit': '',
                    'bottomUnit': 'px',
                    'leftUnit': '%'
                },
                'showTop': false,
                'showRight': false,
                'showBottom': true,
                'showLeft': false
            },
            'br': { //9.Bottom Right
                'style': {
                    'top': 'auto',
                    'right': '15',
                    'bottom': '15',
                    'left': 'auto',
                    'transform': 'none',
                    'topUnit': '',
                    'rightUnit': 'px',
                    'bottomUnit': 'px',
                    'leftUnit': ''
                },
                'showTop': false,
                'showRight': true,
                'showBottom': true,
                'showLeft': false
            }
        };
        return placements;
    }
    getTemplateInfo() {
        const templateTypes = {
            'template1': { 'title': 'template1', 'layout_type': '1' },
            'template2': { 'title': 'template2', 'layout_type': '2' }
        };
        return templateTypes;
    }

    validateBasicSetting(attrs) {
        const validationError = [];
        const domainExp = new RegExp('http:\/\/|https:\/\/');
        const storeNameRegEx = new RegExp(/[a-zA-Z-0-9_\-\.]/gm);
        if (!attrs.type || attrs.type === '') {
            validationError.push('sitetype');
        }
        if (!attrs.siteurl || attrs.siteurl === '') {
            validationError.push('siteurl');
        }
        if (domainExp.test(attrs.type)) {
            validationError.push('domainHttp');
        }

        if (attrs.cms_type === 'shopify' && attrs.cms_store_name === '') {
          validationError.push('shopifyBlankError');
        }

        if (attrs.cms_type === 'shopify' &&
        attrs.cms_store_name !== undefined &&
        attrs.cms_store_name !== '' &&
        !storeNameRegEx.test(attrs.cms_store_name)
      ) {
          validationError.push('shopifyInputError');
        }
        return validationError;
    }

    savebasicDetails(websiteData) {
        websiteData.optin_type = 'single';
        if (websiteData.type === 'http') {
            websiteData.optin_type = 'double';
        }
        const data = JSON.stringify(websiteData);
        const saveWebsite = this.apiService.post('assets/website/add', data);
        return saveWebsite;
    }

    setupOptinType(siteId, optinType) {
        const optinData = {
            siteId: siteId,
            optinType: optinType
        };
        const data = JSON.stringify(optinData);
        const saveOptinType = this.apiService.post('assets/website/setupoptinrule', data);
        return saveOptinType;

    }

    getSiteDatabyId(id) {
        const search = {
            id: id
        };
        // const searchParam = this.apiService.getUrlSearchParams(search),
        //     siteObs = this.apiService.get('assets/website/get', searchParam);
        // return siteObs;
        return this.apiService.get('assets/website/get', search);

    }

    validateBpnSetting(bpnData, activeTab) {
        const validation = {
            fcm: [],
            apns: []
        };
        if (activeTab === 'FCM') {
            validation.fcm = this.validateFcmDetails(bpnData);
            if (validation.fcm.length > 0) {
                return validation;
            }
        }

        if (activeTab === 'APNS') {
            validation.apns = this.validateApnsDetails(bpnData);
            if (validation.apns.length > 0) {
                return validation;
            }
        }

        if (bpnData.auth_key || bpnData.apikey || bpnData.sender_id || bpnData.subdomain) {
            validation.fcm = this.validateFcmDetails(bpnData);
        }
        if (bpnData.ios_pass || (bpnData.p12file && typeof bpnData.p12file === 'object')) {
            validation.apns = this.validateApnsDetails(bpnData);
        }
        return validation;
    }

    validateFcmDetails(bpnData) {
        const validationError = [];
        if (!bpnData.auth_key || bpnData.auth_key === '') {
            validationError.push('auth_key');
        }
        if (!bpnData.apikey || bpnData.apikey === '') {
            validationError.push('apikey');
        }
        if (!bpnData.sender_id || bpnData.sender_id === '') {
            validationError.push('sender_id');
        }
        if (bpnData.type === 'http' && (!bpnData.subdomain || bpnData.subdomain === '')) {
            validationError.push('subdomain');
        }
        if (bpnData.subdomain) {
            if (!this.common.getSubDomainRegex().test(bpnData.subdomain)) {
                validationError.push('subdomainInvalid');
            }
        }
        return validationError;
    }

    validateApnsDetails(bpnData) {
        const validationError = [];
        if (!bpnData.p12FileChanged) {
            return validationError;
        }
        if (!bpnData.ios_pass || bpnData.ios_pass === '') {
            validationError.push('ios_pass');
        }
        const file = bpnData.p12file;
        if (file && file.name) {
            const exts = file.name.split('.');
            const ext = exts[exts.length - 1] || null;
            if (ext !== 'p12') {
                validationError.push('invalidp12');
            }
        } else {
            validationError.push('p12file');
        }
        return validationError;
    }

    uploadFiles(bpnData) {
        const formData = new FormData();
        formData.append('p12file', bpnData.p12file);
        formData.append('filename', 'p12file');
        formData.append('p12password', bpnData.ios_pass);
        formData.append('siteUrl', bpnData.siteurl);
        const data = JSON.stringify(formData);
        const saveWebsite = this.apiService.post('assets/website/uploadfile', formData, 'upload');
        return saveWebsite;
    }

    saveBpnDetails(bpnData) {
        if (bpnData.auth_key) {
            bpnData.fcm_enabled = 1;
        }
        if (bpnData.ios_pass) {
            bpnData.apns_enabled = 1;
        }
        const data = JSON.stringify(bpnData);
        const saveBpn = this.apiService.post('assets/website/add', data);
        return saveBpn;
    }

    getTrackingId() {
        return this.globalsService.paneldata.trackingid;
    }

}
