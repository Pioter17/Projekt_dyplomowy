import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameListComponent } from '@pages/dashboard/components/game-list/game-list.component';

@Component({
  selector: 'pw-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GameListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { }
