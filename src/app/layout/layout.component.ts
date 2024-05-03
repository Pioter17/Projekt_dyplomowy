import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarComponent } from '@layout/components/top-bar/top-bar.component';

@Component({
  selector: 'pw-layout',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }
