export class BpnCampaignDetails {
  id?: number;
  winnerid?: number;
  name?: string;
  status?: number;
  processed?: number;
  publish_time?: string;
  schedule_date?: string; // yyyymmdd
  schedule_time?: string; // HH:mm
  tags?: Tags[];
  website?: Website;
  segments?: ListSegments[];
  segment_ids?: number[];
  list_ids?: number[];
  contents?: Contents[];
  publish_time_front?: string; // yyyymmdd HH:ii
  viaWizard?: boolean;
  setupTab?: boolean;
  audienceTab?: boolean;
  contentTab?: boolean;
  scheduleTab?: boolean;
  step_type?: string;
  timetolive?: number | string;
  schedule_option?: string;
  ttl_dh?: string;
  target_audience?: string; // segment || all
  total_users?: number; // segment
  allUsersCount?: number; // all users
  external_tracking: ExternalTracking;
  siteid?: string;
  getTargetedUsersCount?: number; // alluser wth respect to app selection
  cta?: CTA[];
  is_external_tracking?: boolean;
  autohide?: boolean;
  frequency_capping?: boolean;
  publish?: boolean;
  isDirty?: boolean;
  category?: Category;
  conversion?: Conversion;
  meduimid?: number;
  split_type: string;
  splitid?: number;
  ab_test_window?: string;
  winning_criteria?: string;
  currentActiveTab?: number;
  test_bpn?: boolean;
  token?: string;
  type?: string;
}

export class CTA {
  action?: string;
  title?: string;
  icon?: string;
  id?: number| string;
}
export class ExternalTracking {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export class Website {
  id?: number;
  name?: string;
  siteurl?: string;
  siteid?: string;
  server_type?: string;
}

export class Tags {
  tagid?: number | string;
  tagname?: string;
  color?: string;
  id?: number | string;
}
export class Segments {
  segid?: number;
  segname?: string;
  usercount?: number;
  refresh_time?: string;
}
export class Richpn {
  richpnurl?: string;
  richpntype?: string;
}

export class ListSegments {
  id?: number;
  id_str?: string;
  name?: string;
  type?: string;
  totalcount?: number;
  refresh_updated_time?: string;
}

export class BpnTemplatesParams {
  ostype?: string; // android+ios/android/ios
  search?: string; // name/id
  category?: string; // all/ids
  pageno?: number;
  limit?: number;
  draft?: number;
  is_smart?: number;
  excludeSmartTemplates?: number;
}

export class Category {
  catid?: number | string;
  catname?: string;
  cattype?: string;
}

// FKHA
export class InteractiveBtn {
  actionName?: string;
  actionDeeplink?: string;
  call_to_action?: string;
}

export class Carousel {
  imgTitle?: string;
  imgMsg?: string;
  imgUrl?: string;
  callToAction?: string;
  imgDeeplink?: string;
}

export class BpnTemplateDetails {
  id?: number;
  template_id?: number;
  name = '';
  setupTab?: boolean;
  contentTab?: boolean;
  step_type?: string;
  category?: Category;
  category_name?: string;
  category_type?: string;
  content_id?: number;
  call_to_action?: string;
  call_to_action_url?: string;
  notification_type?: number;
  title?: string;
  content?: string;
  image?: string;
  interactive_btn?: InteractiveBtn[];
  carousel?: Carousel[];
  richpn?: Richpn[];
  cta?: CTA[];
  large_image?: string;
  icon_image?: string;
  is_external_tracking?: boolean;
  autohide?: boolean;
  frequency_capping?: boolean;
  isDirty?: boolean;
  scheduleTab?: boolean;
  is_smart?: number;
}
export class BpnCampaign {
  click: number;
  click_per: number;
  delivered: string;
  failed: string;
  id: string;
  name: string;
  opened: number;
  publish: number;
  publish_time: string;
  sent: string;
  sent_per: number;
  status: string;
  tags: string[];
  date_time: Date;
  selected: boolean;
  showVariant: boolean;
}

export class BpnCampaignParams {
  start_date?: string;
  end_date?: string;
  status?: string;
  search?: string;
  tags?: string | string[];
  cur_page?: string;
  sort_by?: string;
  pageno?: number;
  limit?: number;
  order?: string;
}

export class Contents {
  content_id?: number;
  distribution?: number;
  sentcount?: number;
  call_to_action_url?: string;
  notification_type?: number;
  title?: string;
  content?: string;
  cta?: CTA[];
  richpn?: Richpn[];
  displayTemplate?: boolean;
  isTemplateLoaded?: boolean;
}

export class Conversion {
  activity_id?: number;
  payload?: Payload[];
  revenue_param?: string;
}

export class Payload {
  id?: number;
  payload?: string;
  cond?: string;
  value?: string;
  datatype?: string;
}
