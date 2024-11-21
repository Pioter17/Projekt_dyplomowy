import { Routes } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { AuthComponent } from '@pages/auth/auth.component';

export default [
  {
    path: '',
    redirectTo: RoutesPath.LOGIN,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: RoutesPath.LOGIN,
        loadComponent: () => import('@pages/auth/components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: RoutesPath.REGISTER,
        loadComponent: () => import('@pages/auth/components/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
] as Routes;
