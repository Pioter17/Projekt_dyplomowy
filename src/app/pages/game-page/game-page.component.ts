import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { MemoryComponent } from '@pages/game-page/components/memory/memory.component';
import { MinesweeperComponent } from '@pages/game-page/components/minesweeper/minesweeper.component';
import { ScoreboardComponent } from '@pages/game-page/components/scoreboard/scoreboard.component';
import { MEMORY_MOCK } from '@pages/game-page/mock/memory-scores.mock';
import { MINESWEEPER_MOCK } from '@pages/game-page/mock/minesweeper-scores.mock';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'pw-game-page',
  standalone: true,
  imports: [
    CommonModule,
    MinesweeperComponent,
    MemoryComponent,
    ScoreboardComponent,
    MatButtonModule
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit, OnDestroy {

  gameName: string;
  isGame: boolean = true;
  minesweeperScores = MINESWEEPER_MOCK;
  memoryScores = MEMORY_MOCK;
  activeScores: number[];
  onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => params['name'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe(
      (name) => {
        this.gameName = name;
        switch (this.gameName) {
          case 'minesweeper':
            this.activeScores = this.minesweeperScores;
            break;

          case 'memory':
          this.activeScores = this.memoryScores;
          break;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  receiveDataFromChild(data: number) {
    console.log(data);
    this.activeScores.push(data);
  }

  goBack() {
    this.router.navigateByUrl(RoutesPath.HOME)
  }
}
