import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { ScoreboardService } from '@pages/game-page/services/scoreboard.service';

@Component({
  selector: 'pw-combinations',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatButtonModule],
  templateUrl: './combinations.component.html',
  styleUrl: './combinations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinationsComponent {
  gameLevel: number;
  isSuccess: number;
  play: boolean;
  minutes: number;
  seconds: number;
  isRunning: boolean = false;
  timeInterval: any;
  yourScore: number;
  turns: number;
  board: Set<number>;
  combination: number[];
  expectedBoardSize: number;
  showInterval: number;
  currentStep: number;
  currentCheckStep: number;
  playerTimeLoss: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService
  ) {}

  get boardArray() {
    return [...this.board];
  }

  start(level?: number) {
    this.board = new Set();
    this.play = true;
    this.isSuccess = 0;
    this.turns = 0;
    this.combination = [];
    this.playerTimeLoss = 0;
    this.resetTimer();
    this.createBoard(level);
    this.generateCombination();
  }

  startTimer() {
    this.isRunning = true;
    this.minutes = 3;
    this.seconds = 1;
    this.timeInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.minutes--;
        this.seconds = 59;
      }
      if (this.minutes == 0 && this.seconds == 0) {
        this.play = false;
        this.isSuccess = -1;
        this.countScore();
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
    this.minutes = 3;
    this.seconds = 0;
    this.isRunning = false;
  }

  createBoard(level?: number) {
    if (level) {
      this.gameLevel = level;
    }

    switch (this.gameLevel) {
      case 1:
        this.expectedBoardSize = 8;
        this.showInterval = 1400;
        break;
      case 2:
        this.expectedBoardSize = 12;
        this.showInterval = 1100;
        break;
      case 3:
        this.expectedBoardSize = 16;
        this.showInterval = 800;
    }

    while (this.board.size < this.expectedBoardSize) {
      this.board.add(Math.floor(Math.random() * 18) + 1);
    }
  }

  generateCombination() {
    this.combination.push(Math.floor(Math.random() * this.expectedBoardSize));
    this.showCombination();
  }

  showCombination() {
    this.stopTimer();
    let step = 0;
    let intervalId = setInterval(() => {
      this.currentStep = -1;
      this.cdr.detectChanges();
      setTimeout(() => {
        if (step == this.combination.length) {
          this.currentCheckStep = 0;
          this.startTimer();
          clearInterval(intervalId);
        } else {
          this.currentStep = this.combination[step];
          step++;
          this.cdr.detectChanges();
        }
      }, 100);
    }, this.showInterval);
  }

  checkStep(step: number) {
    if (step == this.combination[this.currentCheckStep]) {
      if (this.currentCheckStep + 1 == this.combination.length) {
        this.playerTimeLoss += 180 - this.minutes * 60 - this.seconds;
        this.turns++;
        this.generateCombination();
      }
      this.currentCheckStep++;
    } else {
      this.play = false;
      this.isSuccess = -1;
      this.countScore();
    }
  }

  countScore() {
    this.yourScore =
      this.turns * 10000 * this.gameLevel -
      this.playerTimeLoss * (14 - this.gameLevel);
    if (this.yourScore > 1000000) {
      this.yourScore = 1000000;
    }
    this.scoreService.updateScores({
      score: this.yourScore,
      username: 'Player',
    });
  }
}
