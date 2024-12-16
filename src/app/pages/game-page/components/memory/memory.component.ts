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
  selector: 'pw-memory',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslocoModule],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService
  ) {}

  play: boolean;
  isSuccess: number;
  gameLevel: number;
  minutes: number = 0;
  seconds: number = 0;
  isRunning: boolean = false;
  interval: any;
  yourScore: number;
  cards: number;
  lock = false;
  oneVisible = false;
  cardsOrder: number[] = [];
  turns = 0;
  firstNr = -1;
  secondNr = -1;
  pairsLeft: number;
  hidden: number[];
  @Output() score = new EventEmitter<number>();

  start(level?: number) {
    this.play = true;
    this.isSuccess = 0;
    this.turns = 0;
    this.shuffle(level);
    this.resetTimer();
    this.startTimer();
  }

  startTimer() {
    this.isRunning = true;
    this.interval = setInterval(() => {
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
    clearInterval(this.interval);
    this.isRunning = false;
  }

  resetTimer() {
    clearInterval(this.interval);
    this.minutes = 0;
    this.seconds = 0;
    this.isRunning = false;
  }

  shuffle(level?: number) {
    if (level) {
      this.gameLevel = level;
    }

    switch (this.gameLevel) {
      case 1:
        this.cards = 8;
        break;
      case 2:
        this.cards = 14;
        break;
      case 3:
        this.cards = 19;
    }

    this.cardsOrder = Array.from({ length: this.cards * 2 }, () => 0);
    this.hidden = Array.from({ length: this.cards * 2 }, () => 0);
    let is_second = false;
    const pairs_nr = this.cards;
    this.pairsLeft = this.cards;
    let i = 1;
    let rand: number;

    while (i < pairs_nr) {
      rand = Math.floor(Math.random() * this.cards * 2);
      if (this.cardsOrder[rand] == 0) {
        this.cardsOrder[rand] = i;

        if (is_second == false) {
          is_second = true;
        } else {
          is_second = false;
          i++;
        }
      } else {
        continue;
      }
    }

    for (let j = 0; j < this.cardsOrder.length; j++) {
      if (this.cardsOrder[j] == 0) {
        this.cardsOrder[j] = i;
      }
    }
  }

  reveal_card(nr: number) {
    if (this.hidden[nr] == 1) {
      return;
    }

    if (this.lock == false) {
      this.lock = true;

      if (this.oneVisible == false) {
        this.oneVisible = true;
        this.firstNr = nr;
        this.lock = false;
      } else {
        if (this.firstNr == nr) {
          this.lock = false;
          return;
        }
        this.secondNr = nr;

        if (this.cardsOrder[this.firstNr] == this.cardsOrder[this.secondNr]) {
          setTimeout(() => this.hide2Cards(this.firstNr, nr), 300);
        } else {
          setTimeout(() => this.restore2Cards(), 300);
        }
        this.turns++;
        this.oneVisible = false;
      }
    }
  }

  hide2Cards(firstNr: number, nr: number) {
    this.hidden[firstNr] = 1;
    this.hidden[nr] = 1;

    this.pairsLeft--;
    this.firstNr = -1;
    this.secondNr = -1;
    if (this.pairsLeft == 0) {
      this.play = false;
      this.isSuccess = 1;
      this.stopTimer();
      this.countScore();
    }
    this.lock = false;
    this.cdr.detectChanges();
  }

  restore2Cards() {
    this.firstNr = -1;
    this.secondNr = -1;
    this.lock = false;
  }

  countScore() {
    this.yourScore =
      Math.pow(10, this.gameLevel + 3) -
      Math.floor(
        (this.minutes * 6 * Math.pow(10, this.gameLevel + 1)) /
          (this.gameLevel + 3)
      ) -
      Math.floor(
        (this.seconds * Math.pow(10, this.gameLevel + 1)) / (this.gameLevel + 3)
      ) -
      Math.floor(
        (this.turns * Math.pow(10, this.gameLevel + 1)) / this.gameLevel
      );
    this.scoreService.updateScores({
      score: this.yourScore,
      game: 'memory',
    });
  }
}
