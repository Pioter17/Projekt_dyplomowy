import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '@core/config/game.interface';
import { Games } from '@core/config/games.config';
import { RoutesPath } from '@core/constants/routes.const';
import { ScoreboardComponent } from '@pages/game-page/components/scoreboard/scoreboard.component';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'pw-game-page',
  standalone: true,
  imports: [
    CommonModule,
    ScoreboardComponent,
    MatButtonModule,
    MatExpansionModule,
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
    private scoreService: ScoreboardService,
  ) { }

  ngOnInit(): void {
    this.activeGame$ = this.route.params.pipe(
      map((params) => params['name'] as string),
      tap((name) => this.gameName = name),
      tap((name) => this.scoreService.setInitialScores(Games?.[name].scores)),
      map((name) => Games?.[name]),
    );
  }

  goBack() {
    this.router.navigateByUrl(RoutesPath.HOME)
  }
}
