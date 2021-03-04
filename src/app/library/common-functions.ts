import * as moment from 'moment';

export const maxRecordLimit = 1000;
export const recordsPerPage = 10;

export const Recent = 'Recent';

// Date picker options
// Date picker options
export function getDateRanges(flag = '') {
  let dates: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 days': [moment().subtract(7, 'days'), moment()],
    'Last 30 days': [moment().subtract(30, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };
  if (flag === 'inapplist' || flag === 'recent' || flag === Recent) {
    dates = {
      Recent: [moment().subtract(6, 'month').startOf('month'), moment()],
      ...dates,
    };
  }
  return dates;
}

export function getMinStartDate() {
  // One and half year back
  return moment().subtract(18, 'month');
}

export function getDatePickerTemplate() {
  return `<div class="daterangepicker custom-calender">
            <div class="ranges"></div>
            <div class="drp-calendar left">
              <div class="calendar-table"></div>
              <div class="calendar-time"></div>
            </div>
            <div class="drp-calendar right">
              <div class="calendar-table"></div>
              <div class="calendar-time"></div>
            </div>
            <div class="drp-buttons">
              <span class="drp-selected"></span>
              <!--<button class="cancelBtn" type="button"></button>-->
              <button class="applyBtn apply-btn" disabled="disabled" type="button"></button>
            </div>
          </div>`;
}

export function getDateLabel(date: DaterangePickerDate) {
  return date.label === CUSTOM_RANGE_LABEL
    ? moment(date.start).format(dateFormatDisplay) +
        ' - ' +
        moment(date.end).format(dateFormatDisplay)
    : date.label;
}

export const dateFormat = 'YYYYMMDD';
export const dateFormatDisplay = 'DD MMM YYYY';
export const CUSTOM_RANGE_LABEL = 'Custom Range';
export const hourFormatDisplay = 'hh';
export const minuteFormatDisplay = 'mm';
export const ampmFormatDisplay = 'A';
export const dateFormatWithTime = 'YYYYMMDDHHMM';
export const dateFormatWithDash = 'YYYY-MM-DD';

export interface DaterangePickerDate {
  start: string;
  end: string;
  label?: string;
  hour?: string;
  minute?: string;
  ampm?: string;
}
