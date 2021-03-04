export class Messages {
  public static SelectOperation = 'Please select some operation';
  public static ParameterAlreadyExists = 'Parameter already exists, please select another';
  public static IrrelevantData = 'Irrelevant data found, do you want to delete?';
  public static DeleteConfirm = 'Do you really want to delete this funnel?';
  public static DeleteParameter = 'Do you really want to delete this parameter?';
  public static successMessgae='Funnel has been saved successfully';
  public static archivesuccessMessgae='Funnel has been archived successfully';
  public static saveSegmentSuccessMessgae='Segment has been saved successfully';
  public static warningMessgae='Your have reached a maximum limit of 10 for saved funnels. To save a new funnel please archive an existing one';
  public static errorMessgae=' Please configure first steps and then add more steps';
  public static errorMessageForDeleteStepDef='You cannot delete this step as minimum 2 steps are mandatory';
  public static archiveConfirmMessage='Do you want to archive this funnel?';
  public static alertMessageToinsertExtraParam='Parameters limit exceeded, please delete an exiting parameters to insert a new one';
  public static maxStepWarningMessgae = 'You can configure maximum 20 steps in a funnel';
  public static firstStepWarnigMessage=' Please configure first step';
  public static selectParameterMessage='Please select parameter';
  public static deleteStepConfirmation='Do you really want to delete this step?';
  public static updateFunnel = 'Something went wrong while updating funnel, please try again.';
  public static loadAttributeData = 'Something went wrong while, loading attriute data, please try again.';
  public static loadTrendChart = 'Something went wrong while getting trend details, please try again.';
  public static loadFunnel = 'Somthing went wrong while loading funnel, please try again.';
  //public static funnelSessionNotCleared = 'Somthing went wrong while loading funnels, please try again.';
  public static alreadyRunning = 'The funnel is already in process, please wait until it complete.';
  public static funnelDateRangeExcced = 'The funnel date range should not greater than 90 days.';
  public static dateRangeExcced = 'The funnel date range should not old than 6 months.';
}

export class ParameterLength {
  public static ParameterMaxLength = 5;
}