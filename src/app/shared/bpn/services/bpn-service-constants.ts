import {
  BpnCampaignDetails,
  BpnTemplateDetails,
  Contents
} from '../interfaces/bpn-campaign-list.model';

export class BpnServiceConstants {
  public static IgnoredKeys: string[] = [
    'processed',
    'total_users',
    'allUsersCount',
    'getTargetedUsersCount',
    'currentActiveTab',
    'setupTab',
    'audienceTab',
    'contentTab',
    'scheduleTab',
    'totalcount',
    'refresh_updated_time',
    'datepicker',
    'publish_time_front',
    'list_ids',
    'segment_ids',
  ];

  // specific api
  public static GetDownloadSummary = 'web/bpn_apis/download_summary_report';
  public static GetCampaignDetails = 'web/bpn_apis/getCampaignDetails';
  public static GetTemplateDetails = 'web/bpn_apis/get_template_details';
  public static GetTemplates = 'web/bpn_apis/get_bpntemplates';
  public static GetRecentTokens = 'public_apis/get_recent_tokens';
  public static GetEditConfirm = 'web/bpn_apis/edit_confirm';

  // public api
  public static SaveCampaign = 'web/bpn_apis/saveCampaign';
  public static SaveFile = 'web/bpn_apis/saveImages';
  public static GetTagMaster = 'public_apis/get_tag_master';
  public static GetWebsite = 'public_apis/getallwebsites';
  public static GetAllUsersCount = 'web/bpn_apis/getAllUserCount';
  public static GetAllSegments = 'public_apis/getAllSegments';
  public static GetAudienceCountByWeb = 'web/bpn_apis/getBpnCount';
  public static GetFrequencyEnableFlag =
    'public_apis/getFrequencyEnableChannelWiseFlag';
  public static GetEnableFrequencyCampaignFlag =
    'public_apis/getEnableFrequencyCampaignFlag';
  public static GetStatusCount = 'public_apis/get_bpn_status_wise_count';
  public static GetStatusMapping = 'public_apis/get_status_mapping';
  public static GetCategories = 'public_apis/get_categories';

  public static SaveTemplate = 'web/bpn_apis/save_template';
  public static CheckTemplateNameExists =
    'web/bpn_apis/check_template_name_exists';
  public static GetCampaignList = 'web/bpn_apis';
  public static CloneCampaign = 'web/bpn_apis/copy_campaign/';
  public static SuspendCampaign = 'web/bpn_apis/suspend_campaign/';
  public static GetAudienceCountByApp =
    'web/bpn_apis/get_audience_count_by_app';
  public static SendTestBpn = 'web/bpn_apis/sendTestbpn/';

  public contents: Contents = {
    content_id: 0,
    distribution: 0,
    sentcount: 0,
    call_to_action_url: '',
    notification_type: 1,
    title: '',
    content: '',
    cta: [],
    richpn: [],
    displayTemplate: true,
    isTemplateLoaded: true
  };

  public campaignDetails: BpnCampaignDetails = {
    name: '',
    winnerid: 0,
    tags: [],
    siteid: '',
    website: null,
    segments: [],
    currentActiveTab: 0,
    contents: [
      {
        content_id: 0,
        distribution: 0,
        sentcount: 0,
        call_to_action_url: '',
        notification_type: 1,
        title: '',
        content: '',
        cta: [],
        richpn: [],
        displayTemplate: true,
        isTemplateLoaded: true
      }
    ],
    viaWizard: true,
    publish_time_front: '',
    setupTab: true,
    audienceTab: false,
    contentTab: false,
    scheduleTab: false,
    target_audience: 'all',
    timetolive: 0,
    ttl_dh: 'hours',
    step_type: 'setup',
    schedule_option: 'now',
    total_users: 0,
    getTargetedUsersCount: 0,
    external_tracking: {},
    is_external_tracking: false,
    cta: [],
    autohide: false,
    frequency_capping: false,
    publish: false,
    isDirty: false,
    conversion: {},
    meduimid: 5, // meduimid = 5 for BPN
    splitid: 0,
    split_type: 'split_ab',
    winning_criteria: 'click',
    test_bpn: false
  };

  public templateDetails: BpnTemplateDetails = {
    name: '',
    call_to_action: '',
    call_to_action_url: '',
    notification_type: 1,
    title: '',
    content: '',
    richpn: [],
    setupTab: true,
    contentTab: false,
    scheduleTab: false,
    step_type: 'setup',
    cta: [],
    frequency_capping: true
  };
}
