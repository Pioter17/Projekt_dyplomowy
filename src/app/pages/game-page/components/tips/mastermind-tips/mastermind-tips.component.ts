import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pw-mastermind-tips',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mastermind-tips.component.html',
  styleUrl: './mastermind-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastermindTipsComponent { }
