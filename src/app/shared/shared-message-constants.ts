export class SharedMessages {
  public static genericFailure = 'Something went wrong, please try again.';
  public static activitiyLoadError =
    'Something went wrong while loading conversion activities, please try again.';
  public static payloadError =
    'Something went wrong while loading payload parameters, please try again.';

  // payload parameter validation messages
  public static intPayloadParamRequired =
    'Enter integer value in payload options ';
  public static intPayloadParam =
    'Enter valid integer value in payload options ';
  public static floatPayloadParamRequired =
    'Enter float value in payload options ';
  public static floatPayloadParam =
    'Enter valid float value in payload options ';
  public static textPayloadParamRequired = 'Enter value in payload options ';
  public static datePayloadParamRequired = 'Select date in payload options';
  public static endDatePayloadParamRequired = 'Select end date in payload options';
  public static textPayloadParam =
    'Only alphabets numbers and , .@ : [ ] " \'/ _ - (special characters ) are allowed in text type payload options.';
  public static operatorRequired = 'Please select operator for payload.';
  public static customPayloadMessages = {
    key: {
      required: 'Custom payload key is required.',
      pattern: 'Only a-z A-Z 0-9 - _ & @ : \' characters are allowed.'
      // pattern: 'Only alphabets numbers and , .@ : \'/ _ - (special characters ) are allowed in custom payload key.',
    },
    value: {
      required: 'Custom payload value is required.',
      pattern: 'Only a-z A-Z 0-9 - _ & @ : \' [ ]  \{ \} characters are allowed.'
      // pattern: 'Only alphabets numbers and , .@ : [ ] " \'/ _ -  \{ \}  (special characters ) are allowed in custom payload value.',
   },
   genericError: 'Please fill valid custom payload\'s key and values',
  };
}
