import { Component, OnDestroy, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-root',
    template: `
      <router-outlet></router-outlet>
      <div *ngIf="isModalShown" [config]="{ show: true, backdrop: 'static', keyboard: false }"
        (onHidden)="onHidden()" bsModal #autoShownModal="bs-modal"
          class="modal fade" tabindex="-1" role="dialog" aria-labelledby="dialog-auto-name">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 id="dialog-auto-name" class="modal-title pull-left">Session Expired</h4>
            </div>
            <div class="modal-body">
              You are logged out. Please <a [href]="loginUrl">click here to login</a>.
            </div>
          </div>
        </div>
      </div>
    `,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown = false;
  loginSubscription: Subscription;
  isLoggedOut = false;
  loginUrl = login_url;

  constructor(
    private api: ApiService,
  ) {}

  ngOnInit () {
    this.loginSubscription = this.api.logOutSub()
      .subscribe((res: boolean) => {
        setTimeout( _ => {
          this.isLoggedOut = res;
          if (this.isLoggedOut && !this.isModalShown) {
            this.showModal();
          }
        });
      });
  }
  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }
}
