import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-mastermind-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './mastermind-tips.component.html',
  styleUrl: './mastermind-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastermindTipsComponent { }
