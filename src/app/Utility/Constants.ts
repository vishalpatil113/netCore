export class Constants {

  public static SelectAll = 'Select All';
  public static UnSelectAll = 'UnSelect All';
  public static RemoveCheckBox = 'removeCheckBox';
  public static StepDefinitions = 'stepdefinitions';
  public static TextboxOptions = 'TextboxOptions';
  public static Activity = 'Activity';
  public static Web = 'App/Web Activity Tracking';
  public static Custom = 'custom';
  public static App = 'app';
  public static TrackActivityOption = 'Track Activity Options';
  public static ChannelAbbreviations = {
    "SMS Activity": "Sms",
    "Email Activity": "Email",
    "Push Notification Activity": "Apn",
    "Browser Push Notification Activity": "Bpn",
    "App/Web Activity Tracking": "",
    "Web Message Activity": "Web-Msg",
    "In App-Message Activity": "Inapp-Msg"
  }
}
export enum paramOperations {
  Sum = 0,
  Avg = 1,
  Count = 2
};

