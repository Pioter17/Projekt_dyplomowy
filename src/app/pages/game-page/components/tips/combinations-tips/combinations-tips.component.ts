import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-combinations-tips',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './combinations-tips.component.html',
  styleUrl: './combinations-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinationsTipsComponent {}
