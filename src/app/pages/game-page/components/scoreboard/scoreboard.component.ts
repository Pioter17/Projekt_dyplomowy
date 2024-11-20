import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  DisplayedScore,
  Score,
} from '@pages/game-page/interfaces/scores.interface';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';
import { Observable, map } from 'rxjs';
import { use } from 'vue/types/umd';

@Component({
  selector: 'pw-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent implements OnInit {
  scores$: Observable<DisplayedScore[]>;

  constructor(private scoreService: ScoreboardService) {}

  ngOnInit(): void {
    this.scores$ = this.scoreService.getScores().pipe(
      map((data: Score[]) => {
        return data
          .map((score) => {
            return convertScores(score);
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
