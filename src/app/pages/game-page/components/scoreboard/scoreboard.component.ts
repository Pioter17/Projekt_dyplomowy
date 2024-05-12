import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
export class ScoreboardComponent { 

  @Input({transform: (data: number[]) => convertScores(data)}) scores: string[];
}

function convertScores(scores: number[]) {
  let convertedScores: string[] = [];
  scores.forEach((score) => {
    let textScore = score.toString();
    for (let i = textScore.length; i < 6; i++) {
      textScore = '0' + textScore;
    }
    convertedScores.push(textScore);
  })

  return convertedScores;
}