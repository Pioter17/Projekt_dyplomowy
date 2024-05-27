import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'pw-scoreboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<string[]>;

  constructor(
    private scoreService: ScoreboardService,
  ) { }

  ngOnInit(): void {
    this.scores$ = this.scoreService.getScores().pipe(
      map((data: number[]) => convertScores(data))
    );
  }
}

function convertScores(scores: number[]) {
  let convertedScores: string[] = [];
  scores
  .sort((a: number, b: number) => b - a)
  .forEach((score) => {
    let textScore = score.toString();
    for (let i = textScore.length; i < 6; i++) {
      textScore = '0' + textScore;
    }
    convertedScores.push(textScore);
  })

  return convertedScores;
}
