import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Payload } from '../bpn/interfaces/bpn-campaign-list.model';
import { BpnCampaignService } from '../bpn/services/bpn-campaign.service';
import { SharedServiceConstants } from '../shared-service-constants';


@Component({
  selector: 'ngn-conversion-tracking',
  templateUrl: './conversion-tracking.component.html',
  styles: []
})
export class ConversionTrackingComponent implements OnInit {
  conversionForm: FormGroup;
  payloads: Payload[];
  payload: Payload;
  summaryPayload: Payload[]
  sharedServiceConstants: SharedServiceConstants;
  operators: any[];
  textOperator: any;
  submitted: boolean = false;
  @Output() summary = new EventEmitter();

  constructor(private fb: FormBuilder, private _api: BpnCampaignService) {
  }
  ngOnInit() {
   
    this.operators = new Array();
    this.textOperator = new Array();
    this.creteConversionForm()
  }
  creteConversionForm() {
    this._api.getPayloads().subscribe(payLoad => {
      this.payloads = new Array();
      this.payloads = payLoad.data;
    })
    this.conversionForm = this.fb.group({
      list: this.fb.array([this.initItemRows()]),
    
    })
  }
  initItemRows() {
    return this.fb.group({
      paylaodId: [''],
      oparatorId: [''],
      oparatorName: [''],
      value: [''],
      datatype:['any']
    });
  }
  get formArray() {
    return this.conversionForm.get('list') as FormArray;
  }

  addNewRow() {
    let varlist = this.conversionForm.get('list') as FormArray;
    varlist.push(this.initItemRows());
    return varlist;
  }

  deleteRow(index: number) {
    if (this.formArray.controls.length == 1) {
      return
    }
    this.formArray.removeAt(index);
  }
  selectPayload(payload: any,i:any) {
    let pay = this.payloads.find(p => p.id == Number(payload.currentTarget.value));
    var operatorMapping = SharedServiceConstants.operatorMapping;
    
    if (pay.datatype == "float") {
      
      this.operators = operatorMapping.float;
     
    }
    else if (pay.datatype == "int") {
      this.operators = new Array();
      this.operators = operatorMapping.int;
    }
    else if (pay.datatype == "text") {
      let list = this.conversionForm.get('list') as FormArray
      list.at(i).get("datatype").setValue('text');
      //this.conversionForm.controls.list.get('datatype').setValue('text')
      //this.conversionForm.controls['datatype'].setValue('text');
      this.textOperator = operatorMapping.text;
    }
  }
 
  save() {
    this.submitted = true;
    if (this.conversionForm.invalid) {
      return;
    }
    this.summaryPayload = new Array();
    for (let i = 0; i<=this.conversionForm.controls['list'].value.length; i++) {
      let payload = this.conversionForm.controls['list'].value[i];
      if (payload) {
        
      var operator = null;
      var value = "";
      this.payload = new Payload();
        this.payload = this.payloads.find(pl => pl.id == payload.paylaodId);
        if (payload.datatype != 'text') {
          operator = this.operators.find(o => o.id == payload.oparatorId);
        } else {
          operator = this.textOperator.find(o => o.id == payload.oparatorId);
        }
      value = payload.value
      this.payload.payload = this.payload.payload
      this.payload.value = value
        this.payload.cond = operator ? operator.value:''
      this.summaryPayload.push(this.payload);
    }
     
    }
    this.summary.emit(this.summaryPayload)
  }
  get formControls() {
    return this.conversionForm.controls;
  }
  getOperatorInteger(itemRow) {
    if (itemRow.value.datatype === 'text') {
      return false
    }
    else {
      return true
    }
  }
  getOperatorText(itemRow) {
    if (itemRow.value.datatype === 'text') {
      return true
    }
    else {
      return false
    }
  }
}
