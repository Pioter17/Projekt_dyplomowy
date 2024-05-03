import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameItemComponent } from '@pages/dashboard/components/game-item/game-item.component';
import { GameItem } from '@shared/interfaces/game.interface';

@Component({
  selector: 'pw-game-list',
  standalone: true,
  imports: [
    CommonModule,
    GameItemComponent
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  games: GameItem[] = [
    {
      name: "saper",
      image: "zdj"
    },
    {
      name: "memory",
      image: "zdj"
    },
  ]
}
