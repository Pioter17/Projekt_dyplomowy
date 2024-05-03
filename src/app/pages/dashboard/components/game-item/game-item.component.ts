import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterModule, RouterState } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';

@Component({
  selector: 'pw-game-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameItemComponent {
  @Input() name: string;
  path = `/${RoutesPath.HOME}/${RoutesPath.GAMES}/`

  constructor(
    private router: Router,
  ) {}

  goTo(name: string) {
    console.log("cokolwiek");
    void this.router.navigate([this.path, name]);
  }
}
