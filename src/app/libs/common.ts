/**
 * Used in Date Range Picker for custom label
 **/
export const CUSTOM_RANGE_LABEL = 'Custom Range';

/**
 * Generates unique string containing letters and numbers
 */
export function generateUniqueId() {
  return Math.random()
    .toString(36)
    .substring(2);
}

/**
 * List of status for campaign listing
 */
export function getStatusMapping() {
  return [
    {id: 2, itemName: 'Scheduled'},
    {id: 3, itemName: 'Published'},
    {id: 4, itemName: 'Failed'},
    {id: 5, itemName: 'In-process'},
    {id: 7, itemName: 'Suspended'},
  ];
}

/**
 * Returns a capital letter with passed integer from 0-25
 * @param index for respective alphabet
 */
export function getVariantLetter(index: number): string {
  return String.fromCharCode(65 + (+index || 0));
}

/**
 * Compares 2 objects and returns true if matches
 * @param obj1 Object 1 for match
 * @param obj2 Object 2 for match
 * @param ignored Array of keys (string) to ignore in the array
 * @param debug Boolean to show console errors for the fail
 * @return true (If second object has exactly same keys
 * and values of first one, returns true else false. Keys which are
 * not available in the second object will be ignored)
 */
export function isEqualWithIgnore(obj1: any, obj2: any, ignored: string[] = [], debug: boolean = false)  {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
    // check if obj1 and obj2 are arrays
    const arrA = Array.isArray(obj1);
    const arrB = Array.isArray(obj2);
    let i: number, length: number, key: string;

    if (arrA && arrB) {
      // if obj1 and obj2 are arrays, check its length
      length = obj1.length;
      if (length !== obj2.length) {
        if (debug) {
          console.log('object length didn\'t match', obj1, obj2);
        }
        return false;
      }

      // if length not matched, loop through each value
      for (i = length; i-- !== 0;) {
        if (!isEqualWithIgnore(obj1[i], obj2[i], ignored)) {
          if (debug) {
            console.log('didn\'t match', obj1, obj2);
          }
          return false;
        }
      }
      return true;
    }

    if (arrA !== arrB) {
      if (debug) {
        console.log('array type not matched', obj1, obj2);
      }
      return false;
    }

    const dateA = obj1 instanceof Date;
    const dateB = obj2 instanceof Date;
    if (dateA !== dateB) {
      if (debug) {
        console.log('date value matched', obj1, obj2);
      }
      return false;
    }

    if (dateA && dateB) {
      if (debug) {
        console.log('date getTime() matched --> ', obj1, obj2, obj1.getTime() === obj2.getTime());
      }
      return obj1.getTime() === obj2.getTime();
    }

    const regexpA = obj1 instanceof RegExp;
    const regexpB = obj2 instanceof RegExp;
    if (regexpA !== regexpB) {
      if (debug) {
        console.log('regex instance not matched', obj1, obj2);
      }
      return false;
    }
    if (regexpA && regexpB) {
      if (debug) {
        console.log('regex toString --> ', obj1, obj2, obj1.toString() === obj2.toString());
      }
      return obj1.toString() === obj2.toString();
    }

    const keys = Object.keys(obj1);
    length = keys.length;

    if (ignored.length === 0) {
      if (length !== Object.keys(obj2).length) {
        if (debug) {
          console.log('obj key length mismatch --> ', obj1, obj2);
        }
        return false;
      }
    }

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(obj2, keys[i]) && !ignored.includes(keys[i])) {
        if (debug) {
          console.log('obj property match failed --> ', obj1, obj2, keys[i]);
        }
        return false;
      }
    }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (ignored.includes(key)) {
        continue;
      }
      if (!isEqualWithIgnore(obj1[key], obj2[key], ignored)) {
        if (debug) {
          console.log('obj key match failed --> ', obj1[key], obj2[key], key);
        }
        return false;
      }
    }

    return true;
  }

  if (debug) {
    console.log('obj check', obj1, obj2, (obj1 !== obj1 && obj2 !== obj2));
  }
  return obj1 !== obj1 && obj2 !== obj2;
}

export function reportDownloadLimit() {
  return +report_download_limit || 5000;
}

export class Common {
  private subDomainUrlRegEx = /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)([a-zA-Z0-9]([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.([a-zA-Z]{2,63})([\/\w\-\.\_]+)?$/;

  private urlRegex = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,5})?(\/.*)?$/i;
  /* tslint:disable-next-line */
  private domiainInUrlRegex = /^(?:http|https?:\/\/)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/i;
  /* tslint:disable-next-line */
  private imgDynamicUrl = /(\[\s*[\w\._]+\s*\])|(\{\{\s*[\w\._]+\s*\}\})|(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/i;
  private allSupportedImgRegex = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|gif|png)/;
  private imgNonGifImage = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:jpe?g|png)/;
  private gifUrlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(?:gif)/;
  // private inputRegex = /^[a-zA-Z0-9 _.@:\[\"\]'\\/-\{\}]*$/;  // OLD Regex changes due to (-) support not working
  private inputRegex = /^[a-zA-Z0-9 \-_.,@:'\[\"\]\/\{\}]*$/;
  private scriptRegex = /(<script)|(<\/script>)|<\/script/gi;
  private audioUrlRegex = /^(http|https):\/\/(.+)\.(mp3|aiff|wav)$/i;
  private videoUrlRegex = /^(http|https):\/\/(.+)\.(m4v|mp4|mov)$/i;
  private campaignNameTitle = /^[a-zA-Z0-9-_&@:?\s]+$/;
  private regexForInteger = /^\d*$/;

  private emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  // Used in App Integration for integration steps
  urlForAppDocs = 'https://docs.netcoresmartech.com/docs/app';
  urlForAndroidAppDocs = 'https://docs.netcoresmartech.com/docs/android-sdk';
  urlForIOSAppDocs = 'https://docs.netcoresmartech.com/docs/ios-sdk-integration';
  urlForActivityDocs = 'https://docs.netcoresmartech.com/docs/activity-tracking';
  urlForFCMServerKeyDocs = 'https://docs.netcoresmartech.com/docs/fcm-server-api-key-google-servicesjson-file';

  /**
   * Returns `RegExp` for matching a url
   */
  getUrlRegex(): RegExp {
    return this.urlRegex;
  }

  public getEmailRegex() {
    return this.emailRegex;
  }

  /**
   * Returns true if string matches with a domain
   * @param url A string to check for domain
   */
  isDomainExistInUrl(url: string): boolean {
    url = url.trim();
    if (this.domiainInUrlRegex.exec(url) !== null) {
      return true;
    }
    return false;
  }

  /*
   * Any sub domain url without special characters or query params
   */
  getSubDomainRegex() {
    return this.subDomainUrlRegEx;
  }

  /**
   * Returns true if string matches with a image url with jpeg, jpg, png, gif url
   * @param url A string to check for image url
   */
  validateImageUrl(url: string): boolean {
    this.allSupportedImgRegex.lastIndex = 0;
    if (this.allSupportedImgRegex.test(url.trim()) === false) {
      return false;
    }
    return true;
  }

  /**
   * Returns `RegExp` which matches jpeg, jpg, png url
   */
  getImageUrlRegex(): RegExp {
    return this.imgNonGifImage;
  }

  getImageNonGifUrlRegex(): RegExp {
    return this.imgNonGifImage;
  }

  /**
   * Returns `RegExp` which matches gif url
   */
  getGifUrlRegex() {
    return this.gifUrlRegex;
  }

  /**
   * Returns `RegExp` which matches simple input value
   */
  getInputRegex() {
    return this.inputRegex;
  }

  /**
   * Returns true if input has valid characters
   * @param input string for validation
   */
  validateInput(input: string) {
    input = input.trim();
    if (input === '') {
      return true;
    }

    this.inputRegex.lastIndex = 0;
    if (this.inputRegex.test(input) === false) {
      return false;
    }
    return true;
  }

  /**
   * Returns true if the string contains any script tags
   */
  checkForScript(input: string): boolean {
    const trimmed = input.trim();
    this.scriptRegex.lastIndex = 0;
    if (this.scriptRegex.test(trimmed)) {
      return false;
    }
    return true;
  }

  /**
   * Returns `RegExp` which matches audio url only https
   */
  getAudioUrlRegex() {
    return this.audioUrlRegex;
  }

  /**
   * Returns `RegExp` which matches video url both https & http
   */
  getVideoUrlRegex() {
    return this.videoUrlRegex;
  }

  /**
   * Returns `RegExp` which matches campaign title
   */
  getCampaignNameTitleRegex() {
    return this.campaignNameTitle;
  }

  getTemplateNameTitleRegex() {
    return this.campaignNameTitle;
  }

  /**
   * Returns `RegExp` which matches integer
   */
  getRegexForInteger() {
    return this.regexForInteger;
  }

  /**
   * Converts given time to seconds
   * @param time Time in minutes or hours
   * @param unit (min | hr) to convert it to seconds
   * @returns number in seconds
   */
  toSeconds(time: number, unit: string = ''): number {
    switch (unit) {
      case 'min':
        time = Math.ceil(time * 60);
        break;
      case 'hr':
        time = Math.ceil(time * 60 * 60);
        break;
    }
    return time;
  }

  /**
   * Converts given number to sec, min, hr
   * @param timeInSec number to convert
   * @param unit Convert number to sec, min, hr
   */
  timeToDefaultUnits(timeInSec: number, unit: string = 'sec'): number {
    let returnTime = 0;
    switch (unit) {
      case 'sec':
        returnTime = timeInSec;
        break;
      case 'min':
        returnTime = Math.ceil(timeInSec / 60);
        break;
      case 'hr':
        returnTime = Math.ceil(timeInSec / 3600);
        break;
    }
    return returnTime;
  }

  /**
   * Returns Variant [A-Z] with respective index from 0
   * @param index index for variant letter
   */
  getVariant(index: number = 0) {
    return 'Variant ' + getVariantLetter(index);
  }

  /**
   * Maximum allowed tabs for content
   */
  getContentTabLength(): number {
    return 3;
  }

  getImageDynamicUrlRegex() {
    return this.imgDynamicUrl;
  }

  /**
   * @todo :: make parameterized  to this method to get single error
   * @param  component, errorType
   */
  // TODO_PARESH :: refer error messages from here
  getCommonErrors(component = '', errorType = '') {
    const errorsJson = {
      warnings: {
        disableBpn:
          /* tslint:disable-next-line */
          'If you disable Browser Push Notifications, you will not be able to send any notifications for this website. Do you want to continue?',
        disableDoubleOptin:
          'If you disable Two Step Opt-in, you will not be able to show custom opt-in notification. Do you want to continue?',
	disableActivityTracking:
	   'If you disable Activity Tracking, your activities will not be tracked. Do you want to continue?',
	disableJS:
	   'Do you want to disable JS?'
      },
      wesiteDashboard: {
        loading:
          'Some thing went wrong while fetching the data. Please try again later.'
      },
      basicDetails: {
        'domain_exist':
          'This website already exists. You can register another website.',
        sitetype: 'Select site type.',
        siteurl: 'Enter site URL.',
        ios_pass_invalid:
          'The password for the Push Certificate file is invalid. Please provide the correct password.',
        ios_pass: '.p12 password is required',
        invalidp12:
          'The Push Certificate file is not valid. Please upload a valid file.',
        p12file: '.p12 file is required',
        auth_key: 'Authorisation key is required.',
        apikey: 'API key is required.',
        sender_id: 'Sender ID is required.',
        subdomain: 'Sub domain is required for an HTTP website.',
        subdomainInvalid: 'Please enter a valid subdomain. Supported characters: A-z0-9./-_',
        shopifyBlankError: 'Enter Shopify store name.',
        shopifyInputError: 'Enter vaild shopify store name.'
      },
      imgUrl: {
        required: 'Enter the image URL.',
        maxLength: 'Image URL length should be greater than 255 characters. ',
        pattern: 'Enter a valid image URL.(Image URL must start with https)'
      },
      notificationText: {
        required: 'Enter the Notification Text.',
        maxLength: 'Notification Text must be more than 255 characters.',
        pattern:
          'Script tags are not allowed in the Notification text. Please enter a valid text.'
      },
      btnNotNow: {
        required: 'Enter the text for Remind me Later button.',
        maxLength:
          'Text for Remind me Later button should be more than 15 characters.',
        pattern:
          'Script tags are not allowed in the Remind Me Later text. Please enter a valid text. '
      },
      btnContinue: {
        required: 'Enter the text for Allow button.',
        maxLength: 'Text for Allow button should be more than 15 characters.',
        pattern:
          'Script tags are not allowed in the Allow text. Please enter a valid text.'
      },
      pageUrl: {
        maxLength: 'Page URL length should be greater than 255 characters.',
        pattern: 'Enter a valid Page URL.'
      },
      optinRules: {
        loading: 'Something went wrong while loading rules, please try again.',
        saveError:
          'Some thing went wrong while saving the Opt-in rules. Please try again.',
        operatorBlank: 'Select the operator to enter the Page URL.',
        pageUrlBlank: 'Enter the Page URL.',
        domainNotRegistered:
          'The domain you have entered in Page URL has not been registered. Enter the correct domain URL.',
        scripTags: 'Scripting tags are not allowed in page url.',
        pageUrlMaxLength:
          'Page URL length should be greater than 255 characters.',
        pageUrlPattern: 'Enter a valid Page URL.'
      },
      // these messages added by paresh
      tabs: {
        notAllowed: {
          message:
            'Before saving current tab you are not allowed to go further.',
          title: ''
        }
      },
      tabsChange: {
        notAllowed: {
          message: 'Before save change you are not allowed to go further.',
          title: ''
        }
      },
      setup: {
        saved: {
          message: 'Campaign details saved successfully.',
          bpnMessage: 'Campaign saved successfully.',
          title: ''
        },
        campaignName: {
          // form
          required: {
            message: 'Please enter campaign name.'
          },
          maxlength: {
            message: 'CampaignName can not exceed more than 200 characters.'
          },
          pattern: {
            message: 'Only a-z A-Z 0-9 - _ & @ : characters are allowed.',
          },

        },
        app: {
          // form
          required: {
            message: 'App required.'
          }
        },
        website: {
          required: {
            message: 'website required.'
          }
        },
        UtmSource: {
          required: {
            message: 'Please insert UTM_Source.'
          },
          maxlength: {
            message: 'UTM_Source can not exceed more than 200 characters.'
          },
          pattern: {
            message: 'Special characters not allowed.'
          }
        },
        UtmMedium: {
          required: {
            message: 'Please insert UTM_Medium.'
          },
          maxlength: {
            message: 'UTM_Medium can not exceed more than 200 characters.'
          },
          pattern: {
            message: 'Special characters not allowed.'
          }
        },
        UtmCampaign: {
          required: {
            message: 'Please insert UTM_Campaign.'
          },
          maxlength: {
            message: 'UTM_Campaign can not exceed more than 200 characters.'
          },
          pattern: {
            message: 'Special characters not allowed.'
          }
        }
      },
      audience: {
        segment: {
          required: {
            message: 'List/Segment required'
          }
        },
        saved: {
          message: 'Audience saved successfully.',
          title: ''
        },
        activity: {
          message: 'Activity required.',
          title: ''
        },
        payload: {
          message: 'Payload required.',
          title: ''
        }
      },
      contents: {
        saved: {
          message: 'Contents are saved.',
          bpnMessage: 'Contents saved successfully.',
          title: ''
        },
        contentMessage: {
          // form
          required: {
            message: 'Please enter content message.'
          },
          maxlength: {
            message: 'ContentMessage can not exceed more than 30 characters.'
          },
          pattern: {
            message: 'Only a-z A-Z 0-9 - _ & @ : characters are allowed.',
          },

        },
      },
      distribute: {
        variant: {
          required: {
            message: 'Variant Required.',
            title: ''
          },
          pattern: {
            message: 'Requred numbers only.',
            title: ''
          }
        }
      },
      scheduled: {
        saved: {
          message: 'Schedule saved successfully.',
          title: ''
        },
        timeToLive: {
          pattern: {
            message: 'Please enter Numbers only.'
          },
          negativeDaysValue: {
            message: 'Days Can not be negative.'
          },
          greaterDaysValue: {
            message: 'Days Can not exceed more than 28 days'
          },
          greaterHoursValue: {
            message: 'Hours Can not exceed more than 673 hours'
          },
          negativeHoursValue: {
            message: 'Hours Can not be negative'
          },
          zeroValue: {
            message: 'Please insert  greater than zero Numbers only.'
          }
        },
        date: {
          less: {
            message: 'Scheduled date can not be less than current time'
          }
        }
      },
      templateSetup: {
        saved: {
          message: 'template details saved successfully.',
          title: ''
        },
        setPlateform: {
          required: {
            message: 'Please select platform.'
          }
        },
        templateName: {
          // form
          required: {
            message: 'Please enter template name.'
          },
          maxlength: {
            message: 'Template Name can not exceed more than 200 characters.'
          },
          pattern: {
            message: 'Only a-z A-Z 0-9 - _ & @ ? : characters are allowed.',
          }
        },
        category: {
          // form
          required: {
            message: 'Category required.'
          }
        }
      },
      generic: {
        error: {
          message: 'Something happend wrong please try again.',
          title: 'Error'
        }
      }
    };
    return errorsJson;
  }
}
