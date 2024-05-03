import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { AuthComponent } from "@pages/auth/auth.component";

export default [
  {
    path: '',
    redirectTo: RoutesPath.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [

    ]
  }
] as Routes
