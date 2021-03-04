import { NgModule, ModuleWithProviders } from '@angular/core';

import { BlockUIModule } from '../block-ui.module';
import { BlockUIPreventNavigation } from './block-ui-prevent-navigation.service';


@NgModule({
  imports: [
    BlockUIModule
  ]
})
export class BlockUIRouterModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BlockUIRouterModule,
      providers: [
        BlockUIPreventNavigation
      ]
    };
  }
}
