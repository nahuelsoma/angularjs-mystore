import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true, // for preload strategy in custom-preload.service.ts
    },
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules, // preload all app modules - only for few modules
      // preloadingStrategy: CustomPreloadService,
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
