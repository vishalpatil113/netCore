import { generateUniqueId, getVariantLetter, CUSTOM_RANGE_LABEL, Common, isEqualWithIgnore} from './common';

describe('common.ts', () => {
  const common: Common = new Common();

  it('CUSTOM_RANGE_LABEL should be `Custom Range`', () => {
    expect(CUSTOM_RANGE_LABEL).toEqual('Custom Range');
  });

  it('generateUniqueId() should generate unique id with letters and numbers', () => {
    expect(generateUniqueId()).toMatch(/[a-z0-9]+/);
  });

  it('getVariantLetter() should return capital letter', () => {
    const values = [];
    const expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < expected.length; i++) {
      values.push(getVariantLetter(i));
    }
    expect(values.join('')).toBe(expected);
  });

  const obj1: any = {
    val1: 1,
    val2: 'val2',
    val3: false,
    val4: [1, 4, 3],
    val5: {
      val6: 'nested',
      val7: {
        val8: false,
        val9: [1, 3, 4],
      }
    },
  };

  const obj2: any = {
    val1: 1,
    val2: 'val2',
    val3: false,
    val4: [1, 4, 3],
    val5: {
      val6: 'nested',
      val7: {
        val8: false,
        val9: [1, 3, 4],
      }
    }
  };

  it('isEqualWithIgnore() should match objects without ignore', () => {
    expect(isEqualWithIgnore(obj1, obj2)).toBe(true);
  });

  it('isEqualWithIgnore() should not match extra key', () => {
    obj1.newKey = 'any value';
    expect(isEqualWithIgnore(obj1, obj2, ['newKey'])).toBe(true);
  });

  it('isEqualWithIgnore() should match objects with ignore', () => {
    delete obj1.newKey;
    obj2.val5.val7.val8 = true;
    obj2.val2 = 'some other text';
    expect(isEqualWithIgnore(obj1, obj2, ['val8', 'val2'])).toBe(true);
  });

  it('isEqualWithIgnore() should not match objects with differences', () => {
    expect(isEqualWithIgnore(obj1, obj2)).toBe(false);
  });

  it('isEqualWithIgnore() should not match objects with ignore one property with diff', () => {
    expect(isEqualWithIgnore(obj1, obj2, ['val2'])).toBe(false);
  });

  it('isEqualWithIgnore() should object test 1', () => {
    expect(isEqualWithIgnore(
      { a : [ 2, 3 ], b : [ 4 ] },
      { a : [ 2, 3 ], b : [ 4 ] }
    )).toBe(true);
  });

  it('isEqualWithIgnore() should object test 2', () => {
    expect(isEqualWithIgnore([ null, null, null ], [ null, null, null ])).toBe(true);
  });

  it('isEqualWithIgnore() should object test 3', () => {
    expect(isEqualWithIgnore(
      [ { a: 3 }, { b: 4 } ],
      [ { a: '3' }, { b: '4' } ]
    )).toBe(false);
  });

  it('isEqualWithIgnore() -> non objects', () => {
    expect(isEqualWithIgnore(3, 3)).toBe(true);
    expect(isEqualWithIgnore('beep', 'beep')).toBe(true);
    expect(isEqualWithIgnore('3', 3)).toBe(false);
    expect(isEqualWithIgnore('3', [3])).toBe(false);
  });

  it('isEqualWithIgnore() -> arguments class', () => {
    expect(isEqualWithIgnore(
      (function(...args) { return args; })(1, 2, 3),
      (function(...args) { return args; })(1, 2, 3)
    )).toBe(true);
  });

  it('isEqualWithIgnore() -> dates', () => {
    const d0 = new Date(1387585278000);
    const d1 = new Date('Fri Dec 20 2013 16:21:18 GMT-0800 (PST)');
    expect(isEqualWithIgnore(d0, d1)).toBe(true);
  });

  it('isEqualWithIgnore() -> buffer', () => {
    expect(isEqualWithIgnore(true, [])).toBe(false);
  });

  it('isEqualWithIgnore() -> null == undefined', () => {
    expect(isEqualWithIgnore(null, undefined)).toBe(false);
  });

  // urls for checking regex of URL as well as domain name
  const urls = [
    'http://pro-netcore.Slack.com/messages/CF37BDD08/files/FF4377LF4/',
    'https://gitlab.com/Netcore-solutions/ui-angular/tree/web_messages',
    'https://prdev.net-core99.co.in/prdevva/admin/index.php/campaign/campaign20%dashboard',
    'https://www.domains.google/learn/?param1=hello:8080@yahoo.com',
  ];
  describe('getUrlRegex()', () => {
    const urlReg = common.getUrlRegex();

    for (const url of urls) {
      it ('should match ' + url, () => {
        expect(url).toMatch(urlReg);
      });
    }
  });

  describe('isDomainExistInUrl()', () => {
    for (const url of urls) {
      it ('should match ' + url, () => {
        expect(common.isDomainExistInUrl(url)).toEqual(true);
      });
    }
  });

  const httpsUrls = {
    jpg: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg',
    ],
    jpeg: [
      'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress',
    ],
    png: [
      'https://www.yaantra.com/Images/Repair/delivery.png',
    ],
    gif: [
      'https://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif',
    ],
    mp3: [
      'https://tooxclusive.com/wp-content/uploads/2013/05/Davido-One-of-A-Kind-tooXclusive.com_.mp3'
    ],
    aiff: [
      'https://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/AIFF/Samples/AFsp/M1F1-AlawC-AFsp.aiff'
    ],
    wav: [
      'https://www.soundjay.com/communication/typewriter-1.wav'
    ],
    m4v: [
      'https://sites.lafayette.edu/newquisk/files/2011/08/ken-video.m4v'
    ],
    mp4: [
      'https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_30mb.mp4'
    ],
    mov: [
      'https://www.steppublishers.com/sites/default/files/step.mov'
    ]
  };

  const httpUrls = {
    jpg: [
      'http://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg',
    ],
    jpeg: [
      'http://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpeg',
    ],
    png: [
      'http://image-net.org/logo.png?hello=world&param=true',
    ],
    gif: [
      'http://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif',
    ],
    m4v: [
      'http://sites.lafayette.edu/newquisk/files/2011/08/ken-video.m4v'
    ],
    mp4: [
      'http://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_30mb.mp4'
    ],
    mov: [
      'http://www.steppublishers.com/sites/default/files/step.mov'
    ]
  };

  const ftpUrls = {
    jpg: [
      'ftp://user:password@host/public_html/images/pic2.jpg',
    ],
    jpeg: [
      'ftp://ftp_username@example.com/folder/filename.jpeg',
    ],
    png: [
      'ftp://image-net.org/logo.png?hello=world&param=true',
    ],
    gif: [
      'ftp://colinbendell.cloudinary.com/image/upload/c_crop,f_auto,g_auto,h_350,w_400/v1512090971/Wizard-Clap-by-Markus-Magnusson.gif',
    ],
  };

  describe('validateImageUrl()', () => {
    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const supportedUrls = [httpsUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(common.validateImageUrl(url)).toEqual(true);
    })();
  });

  describe('getImageUrlRegex()', () => {
    const nonGifRegex = common.getImageUrlRegex();
    const supportedFormats = ['jpg', 'jpeg', 'png'];
    const supportedUrls = [httpsUrls, httpUrls, ftpUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(url).toMatch(nonGifRegex);
    })();
  });

  describe('getImageNonGifUrlRegex()', () => {
    const nonGifRegex = common.getImageNonGifUrlRegex();
    const supportedFormats = ['jpg', 'jpeg', 'png'];
    const supportedUrls = [httpsUrls, httpUrls, ftpUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(url).toMatch(nonGifRegex);
    })();
  });

  describe('getGifUrlRegex()', () => {
    const gifRegex = common.getGifUrlRegex();
    const supportedFormats = ['gif'];
    const supportedUrls = [httpsUrls, httpUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(url).toMatch(gifRegex);
    })();
  });

  const acceptedInputVals = [
    /* tslint:disable-next-line */
    'AAAAEVebpvk:APA91bGbk7aixvUpDC-u52vCvfsmdBJpLWgnHrf5cK3hJvroIrRfidg28xfZqB18XNm0-kGIrqiR-gU2vv8JFIEMkuI0OK57dAQxVoAkoBEY91daiZFtVRLPo6rRRumb4kwZr0J13mcI',
    'Kirankumar----Sripati',
    'testUser99',
    'test@example.com',
    'user_name.value: pass',
    '[special value]',
    'Dear {{Collection.First.Name}}, your \'name\' will be shown like "[Name]"',
    'checking slashes \ /',
  ];
  describe('getInputRegex()', () => {
    const inputRegex = common.getInputRegex();
    for (const inputValue of acceptedInputVals) {
      it ('should match ' + inputValue, () => {
        expect(inputRegex.test(inputValue)).toBe(true);
      });
    }
  });

  const notAcceptedInputVals = [
    'some text with ${hello}',
    'excluded %',
    'excluded ;',
    'excluded `!@#$%^&*()',
    'excluded accept <>|;*',
  ];
  describe('getInputRegex()', () => {
    const inputRegex = common.getInputRegex();
    for (const inputValue of notAcceptedInputVals) {
      it ('should not match ' + inputValue, () => {
        expect(inputRegex.test(inputValue)).toBe(false);
      });
    }
  });

  describe('validateInput()', () => {
    for (const inputValue of acceptedInputVals) {
      it ('should match ' + inputValue, () => {
        expect(common.validateInput(inputValue)).toBe(true);
      });
    }
  });

  describe('checkForScript()', () => {
    const inputValues = [
      'My text something <script       >var a = 100; </script> after script text',
      '<script>console.log(\'hello\')</script>',
      '<script type="text/javascript">eval("hello")</script>',
      'Lórêm ipsúm dólor sit amet, at vítãé</script>',
      '<script> but this doesn\'t have end tags',
      'some script> test </script>',
    ];
    const inputValues2 = [
      'hello world !',
      'Lórêm ipsúm dólor sit amet, at vítãé',
      'some@example.com',
    ];
    for (const inputValue of inputValues) {
      it ('should match true | ' + inputValue, () => {
        expect(common.checkForScript(inputValue)).toBe(false);
      });
    }
    for (const inputValue2 of inputValues2) {
      it ('should match false | ' + inputValue2, () => {
        expect(common.checkForScript(inputValue2)).toBe(true);
      });
    }
  });

  describe('getAudioUrlRegex()', () => {
    const audioRegex = common.getAudioUrlRegex();
    const supportedFormats = ['mp3', 'aiff', 'wav'];
    const supportedUrls = [httpsUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(url).toMatch(audioRegex);
    })();
  });

  describe('getVideoUrlRegex()', () => {
    const videoRegex = common.getVideoUrlRegex();
    const supportedFormats = ['m4v', 'mp4', 'mov'];
    const supportedUrls = [httpsUrls, httpUrls];
    getTestCases(supportedFormats, supportedUrls, url => {
      expect(url).toMatch(videoRegex);
    })();
  });

  const compaignTitles = [
    'Simple title ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    'title with numbers 1111234567890',
    'test_email@exam-ple dot com & : ',
  ];

  describe('getCampaignNameTitleRegex()', () => {
    const titleRegex = common.getCampaignNameTitleRegex();
    for (const inputValue of compaignTitles) {
      it ('should match true | ' + inputValue, () => {
        expect(inputValue).toMatch(titleRegex);
      });
    }
  });

  describe('getTemplateNameTitleRegex()', () => {
    const titleRegex = common.getCampaignNameTitleRegex();
    for (const inputValue of compaignTitles) {
      it ('should match true | ' + inputValue, () => {
        expect(inputValue).toMatch(titleRegex);
      });
    }
  });

  describe('getRegexForInteger()', () => {
    const intRegex = common.getRegexForInteger();
    const inputValues = [
      1,
      23456,
      78999999999999,
      9854568546478946546
    ];
    for (const inputValue of inputValues) {
      it ('should match ' + inputValue, () => {
        expect(inputValue).toMatch(intRegex);
      });
    }
  });

  describe('toSeconds()', () => {
    it ('should return seconds as it is', () => {
      expect(common.toSeconds(25666, '')).toBe(25666);
    });
    it ('should return seconds as it is', () => {
      expect(common.toSeconds(6985, '---')).toBe(6985);
    });
    it ('should convert min to seconds', () => {
      expect(common.toSeconds(2, 'min')).toBe(2 * 60);
    });
    it ('should convert min to seconds', () => {
      expect(common.toSeconds(2.5, 'min')).toBe(Math.ceil(2.5 * 60));
    });
    it ('should convert min to seconds', () => {
      expect(common.toSeconds(4.58666, 'min')).toBe(Math.ceil(4.58666 * 60));
    });
    it ('should convert hours to seconds', () => {
      expect(common.toSeconds(2, 'hr')).toBe(2 * 60 * 60);
    });
    it ('should convert hours to seconds', () => {
      expect(common.toSeconds(2.5, 'hr')).toBe(Math.ceil(2.5 * 60 * 60));
    });
    it ('should convert hours to seconds', () => {
      expect(common.toSeconds(4.58666, 'hr')).toBe(Math.ceil(4.58666 * 60 * 60));
    });
  });

  describe('timeToDefaultUnits()', () => {
    it('should return seconds as it is', () => {
      expect(common.timeToDefaultUnits(100, 'sec')).toBe(100);
    });
    it('should return seconds as it is', () => {
      expect(common.timeToDefaultUnits(120, '---')).toBe(0);
    });
    it('should return seconds as it is', () => {
      expect(common.timeToDefaultUnits(123344, '')).toBe(0);
    });
    it('should return seconds as it is', () => {
      expect(common.timeToDefaultUnits(123344)).toBe(123344);
    });
    it('should convert seconds to minutes', () => {
      expect(common.timeToDefaultUnits(1, 'min')).toBe(1);
    });
    it('should convert seconds to minutes', () => {
      expect(common.timeToDefaultUnits(120, 'min')).toBe(2);
    });
    it('should convert seconds to minutes', () => {
      expect(common.timeToDefaultUnits(180.99, 'min')).toBe(4);
    });
    it('should convert seconds to hours', () => {
      expect(common.timeToDefaultUnits(1, 'hr')).toBe(1);
      expect(common.timeToDefaultUnits(9584, 'hr')).toBe(3);
    });
    it('should convert seconds to hours', () => {
      expect(common.timeToDefaultUnits(3600, 'hr')).toBe(1);
    });
    it('should convert seconds to hours', () => {
      expect(common.timeToDefaultUnits(3600, 'hr')).toBe(1);
    });
  });

  describe('getVariant()', () => {
    it('should return Variant A', () => {
      expect(common.getVariant(0)).toBe('Variant A');
    });
    it('should return Variant Z', () => {
      expect(common.getVariant(25)).toBe('Variant Z');
    });
  });

  describe('getContentTabLength()', () => {
    it('should return 5', () => {
      expect(common.getContentTabLength()).toBe(3);
    });
  });

  // helper functions
  /**
   * Creates `it` functions with the passed formats and url objects
   * @param formats image formats array
   * @param urlObjs url objects array containing specified image formats
   * @param callback callback function to execute with the url
   */
  function getTestCases(formats: string[], urlObjs: any[], callback: Function): Function {
    return function() {
      // for each image format like jpg, jpeg, etc.
      for (const format of formats) {
        // for each url objects like https url, http urls, etc.
        for (const urlObj of urlObjs) {
          // check if current object has specified image format
          if (urlObj[format]) {
            // if it exists, here it assumed as array of urls
            const urlList = urlObj[format];
            // for each url of the image, create a it function
            for (const url of urlList) {
              it('should match ' + format + ' - ' + url, () => {
                // add a callback function with url as a parameter
                callback(url);
              });
            }
          }
        }
      }
    };
  }
});
