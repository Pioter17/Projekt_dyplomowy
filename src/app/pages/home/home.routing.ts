import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { DashboardComponent } from "@pages/dashboard/dashboard.component";
import { HomeComponent } from "@pages/home/home.component";

export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: RoutesPath.ACCOUNT,
        loadChildren: () => import('@pages/account/account.routing')
      },
      {
        path: RoutesPath.GAMES,
        loadChildren: () => import('@pages/games/games.routing')
      }
    ]
  }
] as Routes
