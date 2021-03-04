import { recursiveDeepCopy } from "../libs/utils";

// import { ApnCampaignDetails } from 'src/app/shared/apn/ApnCampaignDetails';

export class SharedServiceConstants {
  // public static GetEditConfirm = 'app/apn/edit_confirm';


 // public api

  public static GetAllActivities = 'public_apis/get_all_activity';
  public static GetPayloadParams = 'public_apis/get_payload_params/';
  public static GetOpertor = 'public_apis/operators';

  public static operatorMapping: any = {
    text: [
      { id: 'is', value: 'is', datatype: 'text', operator : '==' },
      { id: 'ne', value: 'is not', datatype: 'text', operator : '!='  },
      { id: 'co', value: 'contains', datatype: 'text', operator : '=='  },
      { id: 'oo', value: 'is one of', datatype: 'text', operator : '==' }
    ],
    int: [
      { id: 'is', value: 'is', datatype: 'int', operator : '=='  },
      { id: 'gt', value: 'is greater than', datatype: 'int', operator : '>'  },
      { id: 'gte', value: 'is greater than or equal to', datatype: 'int', operator : '>='  },
      { id: 'lt', value: 'is less than', datatype: 'int', operator : '<'  },
      { id: 'lte', value: 'is less than or equal to', datatype: 'int', operator : '<= ' }
    ],
    float: [
      { id: 'is', value: 'is', datatype: 'float', operator : '=='  },
      { id: 'gt', value: 'is greater than', datatype: 'float', operator : '>' },
      { id: 'gte', value: 'is greater than or equal to', datatype: 'float', operator : '>='  },
      { id: 'lt', value: 'is less than', datatype: 'float', operator : '<'  },
      { id: 'lte', value: 'is less than or equal to', datatype: 'float', operator : '<='  }
    ],
    date: [
      { id: 'is', value: 'is', datatype: 'date' },
      { id: 'af', value: 'is after', datatype: 'date' },
      { id: 'bf', value: 'is before', datatype: 'date' },
      { id: 'oaf', value: 'is on or after', datatype: 'date' },
      { id: 'obf', value: 'is on or before', datatype: 'date' }
    ],
    array: [
      { id: 'is', value: 'contains', datatype: 'array' },
      { id: 'ne', value: 'does not contain', datatype: 'array' }
    ]
  };
}
