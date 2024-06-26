import { Routes } from "@angular/router";
import { RoutesPath } from "@core/constants/routes.const";
import { DashboardComponent } from "@pages/dashboard/dashboard.component";
import { GamePageComponent } from "@pages/game-page/game-page.component";
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
        path: ':name',
        component: GamePageComponent
      }
    ]
  }
] as Routes
