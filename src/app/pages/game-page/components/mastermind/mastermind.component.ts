import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';

@Component({
  selector: 'pw-mastermind',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './mastermind.component.html',
  styleUrl: './mastermind.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastermindComponent {

  gameLevel: number;
  play: boolean;
  isSuccess: number;
  minutes: number = 0;
  seconds: number = 0;
  isRunning: boolean = false;
  timeInterval: any;
  turns: number;
  youScore: number;
  maxColors: number;
  hiddenBallsColors: number[];
  visibleBallsColors: number[];
  tips: number[];
  historicColors: number[][] = [[]];
  wrongColorsError: boolean = false;
  @Output() score = new EventEmitter<number>();

  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService,
  ) { }


  start(level?: number) {
    this.play = true;
    this.isSuccess = 0;
    this.turns = 0;
    this.historicColors = [[]];
    this.generateGame(level);
  }

  startTimer() {
    this.isRunning = true;
    this.timeInterval = setInterval(() => {
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes == 60) {
        this.play = false;
        this.isSuccess = -1;
        this.stopTimer();
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timeInterval);
    this.isRunning = false;
  }

  resetTimer() {
    clearInterval(this.timeInterval);
    this.minutes = 0;
    this.seconds = 0;
    this.isRunning = false;
  }

  generateGame(level?: number) {
    let balls;

    if (level) {
      this.gameLevel = level;
    }

    switch (this.gameLevel) {
      case 1:
        this.maxColors= 4;
        balls = 4;
        break
      case 2:
        this.maxColors= 6;
        balls = 4;
        break
      case 3:
        this.maxColors= 6;
        balls = 6;
    }
    this.resetTimer();
    this.startTimer();

    this.hiddenBallsColors = Array.from({ length: this.maxColors}, () => 0);
    this.visibleBallsColors = Array.from({ length: this.maxColors}, () => 0);
    this.tips = [];
    for (let i = 0; i < this.maxColors; i++) {
      let colorNumber = Math.floor(Math.random() * this.maxColors) + 1;
      this.hiddenBallsColors[i] = colorNumber;
    }
    this.cdr.detectChanges();
  }

  changeColor(ballId: number) {
    this.visibleBallsColors[ballId] = ((this.visibleBallsColors[ballId]) % this.maxColors) + 1;
    this.cdr.detectChanges();
  }

  check() {
    if (!this.play) {
      return;
    }
    if (this.visibleBallsColors.some((ball) => ball == 0)) {
      this.wrongColorsError = true;
      return;
    }
    this.turns++;
    this.wrongColorsError = false;
    if (JSON.stringify(this.visibleBallsColors) == JSON.stringify(this.hiddenBallsColors)) {
      this.isSuccess = 1;
      this.play = false;
      this.stopTimer();
      this.countScore();
    } else {
      this.tips = [];
      let visibleCopy = [...this.visibleBallsColors];
      let hiddenCopy = [...this.hiddenBallsColors];
      for (let i = 0; i < this.visibleBallsColors.length; i++) {
        if (visibleCopy[i] == hiddenCopy[i]) {
          this.tips = [...this.tips, 7];
          hiddenCopy[i] = -1;
          visibleCopy[i] = 0;
        }
      }
      for (let i = 0; i < this.visibleBallsColors.length; i++) {
        for (let j = 0; j < hiddenCopy.length; j++) {
          if (visibleCopy[i] == hiddenCopy[j]) {
            this.tips = [...this.tips, 8];
            visibleCopy[i] = 0;
            hiddenCopy[j] = -1;
            break;
          }
        }
      }
      this.historicColors.push([...this.visibleBallsColors, ...this.tips])
      this.cdr.detectChanges();
    }
  }

  countScore() {
    this.youScore = Math.pow(10, this.gameLevel+3)
                    -Math.floor(this.minutes*6*Math.pow(10, this.gameLevel+1)/(this.gameLevel+3))
                    -Math.floor(this.seconds*Math.pow(10, this.gameLevel+1)/(this.gameLevel+3))
                    -Math.floor(this.turns*3*Math.pow(10,this.gameLevel+1)/(this.gameLevel+3));

    if (this.youScore > 1000000) {
      this.youScore = 1000000;
    }
    this.scoreService.updateScores(this.youScore);
  }
}
