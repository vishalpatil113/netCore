import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgnComponent } from './ngn.component';

/**
 * Routes for NGN, starts with `/ngn/`
 * Breadcrumb names must be given here
 */
const routes: Routes = [
  {
    path: '',
    component: NgnComponent,
    children: [
      {
        path: 'webpush_dashboard',
        loadChildren: './campaigns/broadcast/bpn/bpn.module#BpnModule',
        data: {
          breadcrumbs: [
            {
              breadcrumbs: 'Campaigns',
              path: '/campaign_dashboard'
            },
            {
              breadcrumbs: 'Broadcast',
              static: true
            },
            {
              breadcrumbs: 'Web Push Notification',
              path: '/webpush_dashboard'
            }
          ]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NgnRoutingModule {}
