import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-memory-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './memory-tips.component.html',
  styleUrl: './memory-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryTipsComponent { }
