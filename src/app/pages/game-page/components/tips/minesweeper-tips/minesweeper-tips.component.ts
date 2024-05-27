import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pw-minesweeper-tips',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './minesweeper-tips.component.html',
  styleUrl: './minesweeper-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperTipsComponent { }
