import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-minesweeper-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './minesweeper-tips.component.html',
  styleUrl: './minesweeper-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperTipsComponent { }
