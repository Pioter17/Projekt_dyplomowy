import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { ScoreboardService } from '@pages/game-page/services/scoreboard.service';

@Component({
  selector: 'pw-whack-a-mole',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslocoModule],
  templateUrl: './whack-a-mole.component.html',
  styleUrl: './whack-a-mole.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhackAMoleComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService
  ) {}

  gameLevel: number;
  maxTime: number;
  hideSpeed: number;
  showSpeed: number;
  holes: number;
  play: boolean;
  isSuccess: number;
  seconds: number = 0;
  isRunning: boolean = false;
  timeInterval: any;
  showInterval: any;
  hideTimeout: any;
  points: number;
  yourScore: number;
  holesIds: number[];
  @Output() score = new EventEmitter<number>();

  start(level?: number) {
    this.reset();
    this.play = true;
    this.loadBoard(level);
  }

  reset() {
    this.play = false;
    this.isSuccess = 0;
    this.points = 0;
    this.holes = 0;
    this.maxTime = 0;
    this.hideSpeed = 0;
    this.holesIds = [];
    this.cdr.detectChanges();
    clearInterval(this.showInterval);
    clearTimeout(this.hideTimeout);
  }

  startTimer() {
    this.isRunning = true;
    this.timeInterval = setInterval(() => {
      this.seconds--;
      if (this.seconds == 0) {
        this.play = false;
        this.isSuccess = 1;
        this.countScore();
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
    this.seconds = this.maxTime;
    this.isRunning = false;
  }

  loadBoard(level?: number) {
    if (level) {
      this.gameLevel = level;
    }

    switch (this.gameLevel) {
      case 1:
        this.holes = 18;
        this.maxTime = 30;
        this.hideSpeed = 2;
        this.showSpeed = 500;
        break;
      case 2:
        this.holes = 24;
        this.maxTime = 30;
        this.hideSpeed = 1.5;
        this.showSpeed = 400;
        break;
      case 3:
        this.holes = 24;
        this.maxTime = 20;
        this.hideSpeed = 0.8;
        this.showSpeed = 300;
    }
    this.resetTimer();
    this.startTimer();

    this.holesIds = Array.from({ length: this.holes }, () => 0);
    this.cdr.detectChanges();
    this.showMole();
  }

  showMole() {
    let rand: number;
    this.showInterval = setInterval(() => {
      rand = Math.floor(Math.random() * this.holes);
      if (this.holesIds[rand] == 0) {
        this.holesIds[rand] = 1;
        this.hideMole(rand);
      }
      this.cdr.detectChanges();
    }, this.showSpeed);
  }

  hideMole(moleId: number) {
    this.hideTimeout = setTimeout(() => {
      this.holesIds[moleId] = 0;
    }, this.hideSpeed * 1000);
  }

  whack(moleId: number) {
    if (this.holesIds[moleId] == 1) {
      this.holesIds[moleId] = 0;
      this.points++;
    }
  }

  countScore() {
    this.yourScore = Math.floor(6000 * this.gameLevel * this.points);
    this.scoreService.updateScores({
      score: this.yourScore,
      username: 'Player',
    });
  }
}
