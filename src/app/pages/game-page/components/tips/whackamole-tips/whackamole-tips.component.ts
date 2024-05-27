import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pw-whackamole-tips',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './whackamole-tips.component.html',
  styleUrl: './whackamole-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhackamoleTipsComponent { }
