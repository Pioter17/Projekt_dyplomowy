import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pw-memory',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryComponent { }
