export class Messages {
  public static bpnTitleRequired = 'Please enter title';
  public static bpnTitleMaxLength = 'Maximum character limit exceed';
  public static bpnTitlePattern =
    'These characters are not allowed in BPN title.';
  public static bpnContentRequired = 'Please enter Push Notification Message.';
  public static bpnContentMaxLength =
    'Maximum character limit exceed for BPN content.';
  public static bpnContentPattern =
    'These characters are not allowed in BPN content.';

  public static ctaRequired = 'Please enter landing page url.';

  public static ctaLabelRequired = 'CTA label is required.';
  public static ctaUrlRequired = 'CTA url is required.';
  public static ctaLabelMaxLength = 'Maximum character limit for CTA label is 40.';
  public static ctaUrlMaxLength =
    'Maximum character limit for CTA url is 1000.';
  public static ctaUrlPattern = 'Invaild CTA url provided.';

  public static ctaDeepLinkRequired = 'Deeplink is required.';
  public static ctaDeepLinkMaxLength =
    'Maximum character limit for deeplink is 1000.';
  public static ctaDeepLinkPattern = 'Invaild deeplink provided.';

  public static imageUrlRequired = 'Image url required';
  public static imageUrlMaxlength =
    'Maximum character limit for image url is 1000';
  public static imageUrlPattern = 'Invaild image url provided.';

  public static audioUrlRequired = 'Audio url is required.';
  public static audioUrlMaxlength =
    'Maximum character limit for audio url is 1000';
  public static audioUrlPattern = 'Invaild audio url provided';
  public static audioUrlNotExist = 'Audio url does not exists.';

  public static videoUrlRequired = 'Video url is required.';
  public static videoUrlMaxlength =
    'Maximum character limit for video url is 1000.';
  public static videoUrlPattern = 'Invaild video url provided';
  public static videoUrlNotExist = 'Video url does not exists.';

  public static gifUrlRequired = 'GIF url is required.';
  public static gifUrlMaxlength =
    'Maximum character limit for gif url is 1000.';
  public static gifUrlPattern = 'Invaild gif url provided.';
  public static gifUrlNotExist = 'GIF url does not exists.';

  public static TitleContentImageRequired =
    'Title, Content or Image url required.';
  public static TitleContentUrlRequired =
    'Title, Content and Landing Page URL required.';
  public static CarouselTitleLength = 'Can not exceed more than 30 characters.';
  public static Min2CarouselSlidesRequired =
    'Minimum 2 carousel slides are required.';
  public static CarouselMessageLength =
    'Can not exceed more than 30 characters.';

  public static ScriptTagNotAllowed = 'Script tags are not allowed';

  public static TokenRequired = 'Please provide token.';
  public static TokenRequiredIden = 'Please provide primary key.';

  public static TokenEmailRequired = 'Please provide valid email.';

  public static MaxTokenLimitReached =
    'Maximum 5  Identified ID / tokens are allowed for test BPN.';
  public static CarouselTitleRequired = 'Title required';
  public static CarouselImageRequired = 'Image url required.';
  public static CarouselImageInvalid = 'Invalid image url.';

  public static bpnActionButtonLabelRequired = 'Label required.';
  public static bpnActionButtonLabelMaxlength =
    'Maximum character limit for label is 40.';

  public static genericFailure = 'Something went wrong, please try again.';
  public static activitiyLoadError =
    'Something went wrong while loading conversion activities, please try again.';
  public static payloadError =
    'Something went wrong while loading payload parameters, please try again.';

  public static validationMessagesForSetup = {
    name: {
      required: 'Campaign Name is required.',
      maxlength: 'Campaign Name must be less than 255 characters.',
      pattern: 'Only a-z A-Z 0-9 - _ & @ : ? characters are allowed.'
    },
    website: {
      required: 'Website required.'
    },
    tags: {},
    checkAdvanceOptions: {
      required: 'Advance Option is required.'
    },
    conversionTrackingFlag: {
      required: 'Conversion Tracking is required.'
    },
    checkUTM: {
      required: 'External Tracking is required.'
    },

    // ------------------------------
    utmSource: {
      required: 'Please insert UTM Source.',
      pattern: 'Special characters not allowed.',
      maxlength: 'UTM Source can not exceed more than 50 characters.'
    },
    utmMedium: {
      required: 'Please insert UTM Medium.',
      maxlength: 'UTM Medium can not exceed more than 50 characters.',
      pattern: 'Special characters not allowed.'
    },
    utmCampaign: {
      required: 'Please insert UTM Campaign.',
      maxlength: 'UTM Campaign can not exceed more than 50 characters.',
      pattern: 'Special characters not allowed.'
    },
    utmContent: {
      pattern: 'Special characters not allowed',
      maxlength: 'utmContent can not exceed more than 50 characters'
    },
    utmTerm: {
      pattern: 'Special characters not allowed',
      maxlength: 'utmContent can not exceed more than 50 characters'
    }
  };

  public static validationMessagesForAudience = {
    target_audience: {
      required: 'Please select target audience.'
    },
    segments: {
      required: 'Please select list/segment.'
    },
    searchAud: {
      required: ''
    }
  };

  public static validationMessagesForSchedule = {
    schedule_option: {
      required: 'Campaign start date and time is required.'
    },
    datepicker: {
      required: 'Campaign start date and time is required.'
    },
    timetolive: {
      required: 'Time to live is required.',
      min: 'The Time to live field  must be greater than zero.',
      max: 'Enter time to live is not valid',
      maxDays: 'Enter time to live less than 29 Days',
      maxHours: 'Enter time to live less than 672 Hours',
      maxlength: 'Only 10 characters are allowed.',
      pattern: 'Only digits are allowed'
    }
  };

  public static validationMessagesForContents = {
    title: {
      required: 'Please enter title.',
      maxlength: 'Can not exceed more than 75 characters.',
      pattern: 'These characters are not allowed.'
    },
    content: {
      required: 'Please enter content.',
      maxlength: 'Can not exceed more than 1000 characters.',
      pattern: 'These characters are not allowed.'
    },
    call_to_action_url: {
      required: 'please enter CTA Url.',
      pattern: 'Invalid CTA url.',
      maxlength: 'Can not exceed more than 300 characters.',
      utmUrl: 'Please include utm values in Setup > Advanced > External Tracking',
    },
    advanced: {
      required: 'advance option is required.'
    },
    richPush: {
      // switch
    },
    rich_image: {
      // radio
    },
    richpnurl: {
      // image icon
      pattern: 'Invalid image url.'
    },
    richpnurl2: {
      // large image
      pattern: 'Invalid image url.'
    },
    actionButtons: {
      // switch
    },
    actionButtonsArray: {
      title: {
        required: 'CTA label is required.',
        maxlength: 'Maximum character limit is 40.',
        pattern: 'Only a-z A-Z 0-9 - _ & @ : ? special characters are allowed'
      },
      action: {
        required: 'CTA url is required.',
        maxlength: 'Maximum character limit for CTA url is 1000.',
        pattern: 'Invaild CTA url provided.'
      },
      icon: {
        pattern: 'Invaild image url provided.',
        maxlength: 'Maximum character limit is 40.'
      }
    }
  };

  public static validationMessagesForDistribution = {
    split_ab: {
      required: 'Variant distribution is required.',
      pattern: 'Please provide number only',
      min: 'Variant  must be greater than equal to 10.',
      minlength: 'Variant  must be greater than equal to 10.',
      max: 'Can not exceed more than {maxVal}'
    },
    split: {
      required: 'Variant distribution is required.',
      pattern: 'please provide number only',
      min: 'Variant  must be greater than equal to 10.',
      minlength: 'Variant  must be greater than equal to 10.',
      totalSum: 'Sum off all the variants must be 100'
    },
    timetolive: {
      pattern: 'Only numbers allowed',
      hoursGreater: 'Hours cannot exceed more than 23',
      minutesGreater: 'Minutes cannot exceed more than 59',
      minTime: 'Can not be less than 30 minutes.',
      maxTime: 'Can not exceed more than 23 hours and 59 minutes.',
    }
  };
}
