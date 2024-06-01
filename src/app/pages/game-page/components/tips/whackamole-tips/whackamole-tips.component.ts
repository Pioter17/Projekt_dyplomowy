import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pw-whackamole-tips',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './whackamole-tips.component.html',
  styleUrl: './whackamole-tips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhackamoleTipsComponent { }
