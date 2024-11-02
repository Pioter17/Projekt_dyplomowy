import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-solitaire-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './solitaire-tips.component.html',
  styleUrl: './solitaire-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolitaireTipsComponent { }
