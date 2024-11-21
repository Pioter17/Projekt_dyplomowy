import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '@core/config/game.interface';
import { Games } from '@core/config/games.config';
import { RoutesPath } from '@core/constants/routes.const';
import { TranslocoModule } from '@jsverse/transloco';
import { ScoreboardComponent } from '@pages/game-page/components/scoreboard/scoreboard.component';
import { ScoreboardService } from '@pages/game-page/services/scoreboard.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'pw-game-page',
  standalone: true,
  imports: [
    CommonModule,
    ScoreboardComponent,
    MatButtonModule,
    MatExpansionModule,
    TranslocoModule,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
  gameName: string;
  isGame: boolean = true;
  activeGame$: Observable<Game>;
  helpOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreboardService
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    this.activeGame$ = this.route.params.pipe(
      map((params) => params['name'] as string),
      tap((name) => (this.gameName = name)),
      tap((name) => this.scoreService.setInitialScores(name)),
      map((name) => Games?.[name])
    );
  }
}
