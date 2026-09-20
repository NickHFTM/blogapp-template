import { Routes } from '@angular/router';

import { BlogOverviewPageComponent } from './blog-overview-page/blog-overview-page';
import { blogResolver } from './shared/blog.resolver';
import { entriesResolver } from './feature/blog/blog-overview-page/entries-resolver';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: BlogOverviewPageComponent,
    resolve: {
      blogs: entriesResolver,
    },
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'blog/create',
    canActivate: [authGuard],
    loadComponent: () => import('./blog-create/blog-create').then((m) => m.BlogCreateComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./blog-detail-page/blog-detail-page').then((m) => m.BlogDetailPage),
    resolve: {
      blog: blogResolver,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
