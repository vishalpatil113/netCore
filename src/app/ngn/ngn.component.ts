import { Component } from '@angular/core';

/**
 * NGN Root Component
 */
@Component({
  selector: 'ngn-ngn',
  template: `
    <ngn-main-layout>
      <mc-breadcrumbs></mc-breadcrumbs>
      <router-outlet></router-outlet>
    </ngn-main-layout>
  `,
})
export class NgnComponent {}
