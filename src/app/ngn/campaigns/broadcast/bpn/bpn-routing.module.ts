import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BpnCreateComponent } from './componments/bpn-create/bpn-create.component';

const routes: Routes = [
  {
    path: '',
    component: BpnCreateComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpnRoutingModule {}
