import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ErrorService {

  public errorMsg: BehaviorSubject<string> = new BehaviorSubject<string>('');

      showErrorMessage(value: string) {
          this.errorMsg.next(value);
      }


}
