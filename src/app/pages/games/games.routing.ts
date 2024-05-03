import { Routes } from "@angular/router";
import { GamePageComponent } from "@pages/games/components/game-page/game-page.component";
import { GamesComponent } from "@pages/games/games.component";

export default [
  {
    path: '',
    component: GamesComponent,
    children: [
      {
        path: ':name',
        component: GamePageComponent
      }
    ]
  }
] as Routes
