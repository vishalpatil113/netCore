import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false,
  // preloadingStrategy: PreloadAllModules,
  // enableTracing: true,
});
