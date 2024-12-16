import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { TranslocoModule } from '@jsverse/transloco';
import {
  DisplayedScore,
  Score,
} from '@pages/game-page/interfaces/scores.interface';
import { ScoreboardService } from '@pages/game-page/services/scoreboard.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'pw-scoreboard',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<DisplayedScore[]>;
  myScores$: Observable<string[]>;
  myUsername = '';

  constructor(
    private scoreService: ScoreboardService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.scores$ = this.scoreService.getScores().pipe(
      tap(() => (this.myUsername = this.localStorageService.getItem('name'))),
      map((data: Score[]) => {
        return data
          .sort((a: Score, b: Score) => b.score - a.score)
          .map((score) => {
            return convertScores(score);
          });
      })
    );

    this.myScores$ = this.scoreService.getMyScores().pipe(
      map((data: number[]) => {
        return data
          .sort((a: number, b: number) => b - a)
          .map((score) => {
            return convertMyScores(score);
          });
      })
    );
  }
}

function convertScores(score: Score) {
  let textScore = score.score.toString();
  for (let i = textScore.length; i < 6; i++) {
    textScore = '0' + textScore;
  }
  return { score: textScore, username: score.username };
}

function convertMyScores(score: number) {
  let textScore = score.toString();
  for (let i = textScore.length; i < 6; i++) {
    textScore = '0' + textScore;
  }
  return textScore;
}
