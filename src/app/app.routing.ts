import { Routes } from '@angular/router';
import { RoutesPath } from './core/constants/routes.const';

export default [
  {
    path: '',
    redirectTo: RoutesPath.HOME,
    pathMatch: 'full'
  },
  {
    path: RoutesPath.HOME,
    loadChildren: () => import('@pages/home/home.routing'),
  },
  {
    path: RoutesPath.AUTH,
    loadChildren: () => import('@pages/auth/auth.routing'),
  },
  {
    path: '**',
    redirectTo: RoutesPath.HOME,
    pathMatch: 'full'
  }
] as Routes;
