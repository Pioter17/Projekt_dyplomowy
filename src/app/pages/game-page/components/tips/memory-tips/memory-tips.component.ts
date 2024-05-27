import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pw-memory-tips',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './memory-tips.component.html',
  styleUrl: './memory-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryTipsComponent { }
