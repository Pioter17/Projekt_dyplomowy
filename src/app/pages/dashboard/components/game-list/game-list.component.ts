import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Games } from '@core/config/games.config';
import { GameItemComponent } from '@pages/dashboard/components/game-item/game-item.component';

@Component({
  selector: 'pw-game-list',
  standalone: true,
  imports: [
    CommonModule,
    GameItemComponent,
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  games: string[] = Object.keys(Games);
}
