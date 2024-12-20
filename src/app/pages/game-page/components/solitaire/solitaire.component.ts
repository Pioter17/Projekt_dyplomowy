import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { Card } from '@pages/game-page/components/solitaire/card';
import { ScoreboardService } from '@pages/game-page/services/scoreboard.service';
import { GetLastFieldClassPipe } from '@shared/pipes/get-last-field-class.pipe';
import { GetTemporaryStatePipe } from '@shared/pipes/get-temporary-state.pipe';

@Component({
  selector: 'pw-solitaire',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    GetTemporaryStatePipe,
    GetLastFieldClassPipe,
  ],
  templateUrl: './solitaire.component.html',
  styleUrl: './solitaire.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolitaireComponent {
  gameLevel: number;
  isSuccess: number;
  play: boolean;
  minutes: number;
  seconds: number;
  timeInterval: any;
  yourScore: number;
  moves: number;
  showInterval: number;
  isRunning: boolean = false;
  colors: number;
  first: Card;
  board: Card[][];
  cardsLeft: number[];
  completedChains: number[];
  additionsLeft: number[];

  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService
  ) {}

  start(level?: number) {
    this.play = true;
    this.isSuccess = 0;
    this.moves = 0;
    this.gameLevel = level;
    this.completedChains = [];
    this.additionsLeft = [1, 1, 1, 1, 1];
    this.resetTimer();
    this.startTimer();
    this.initBoard(level);
  }

  initBoard(level: number) {
    switch (level) {
      case 1:
        this.colors = 1;
        break;
      case 2:
        this.colors = 2;
        break;
      case 3:
        this.colors = 4;
        break;
    }
    let cardsOrder = new Set<number>();
    while (cardsOrder.size < 104) {
      cardsOrder.add(Math.floor(Math.random() * 104) + 1);
    }
    const cards = Array.from(cardsOrder);
    const board = Array.from({ length: 10 }, () => []);

    let cardIndex = 0;
    for (let i = 0; i < 4; i++) {
      let partOfCards = cards.slice(cardIndex, cardIndex + 6);
      for (let j = 6; j > 0; j--) {
        // Dodawanie jest tak zrobione z powodu konieczności odwrócenia tablicy na końcu operacji. Indeksy muszą być dodane od razu poprawnie.
        board[i].push(
          new Card(
            partOfCards[6 - j] % 13,
            (Math.floor(partOfCards[6 - j] / 13) % this.colors) + 1,
            j < 6 ? board[i][6 - j - 1] : null,
            i,
            j,
            j == 6 ? true : false
          )
        );
      }
      board[i].push(new Card(-1, -1, board[i][5], i, 0));
      board[i] = board[i].reverse();
      cardIndex += 6;
    }
    for (let i = 4; i < 10; i++) {
      let partOfCards = cards.slice(cardIndex, cardIndex + 5);
      for (let j = 5; j > 0; j--) {
        board[i].push(
          new Card(
            partOfCards[5 - j] % 13,
            (Math.floor(partOfCards[5 - j] / 13) % this.colors) + 1,
            j < 5 ? board[i][5 - j - 1] : null,
            i,
            j,
            j == 5 ? true : false
          )
        );
      }
      board[i].push(new Card(-1, -1, board[i][4], i, 0));
      board[i] = board[i].reverse();
      cardIndex += 5;
    }
    this.cardsLeft = cards.slice(cardIndex);
    this.board = board;
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

  checkMatching(colIndex: number, cardIndex: number) {
    if (!this.first) {
      this.first = this.board[colIndex][cardIndex];
      if (!this.first.canChainBeMoved()) {
        this.first.setTemporaryState('error');
        this.first = null;
        return;
      }
      this.first.setTemporaryStateChain('active');
      return;
    } else {
      let second = this.board[colIndex][cardIndex];
      if (!second.isOnTop()) {
        second.setTemporaryState('error');
        this.first.setTemporaryStateChain('error');
        this.first = null;
        return;
      }

      if (this.first.canBePlacedAt(second)) {
        this.move(this.first, second);
        this.first.setTemporaryStateChain('');
        this.first = null;
        return;
      } else {
        second.setTemporaryState('error');
        this.first.setTemporaryStateChain('error');
        this.first = null;
        return;
      }
    }
  }

  move(firstCard: Card, secondCard: Card) {
    let firstCardData = firstCard.CardData;
    let secondCardData = secondCard.CardData;
    let movedPart = this.board[firstCardData.columnId].splice(firstCardData.id);
    this.board[secondCardData.columnId] = [
      ...this.board[secondCardData.columnId],
      ...movedPart,
    ];
    this.board[firstCardData.columnId][firstCardData.id - 1].reveal();
    this.board[firstCardData.columnId] = [
      ...this.board[firstCardData.columnId],
    ];
    firstCard.putOn(secondCard);
    this.moves++;
    this.checkChainAndFinishCondition(secondCardData.columnId);
    this.cdr.detectChanges();
  }

  addCards() {
    if (this.additionsLeft.length < 1) {
      return;
    }
    let cardsToAdd = this.cardsLeft.splice(0, 10);
    for (let i = 0; i < 10; i++) {
      let newCardOnTop = new Card(
        cardsToAdd[i] % 13,
        (Math.floor(cardsToAdd[i] / 13) % this.colors) + 1,
        null,
        i,
        this.board[i].length,
        true
      );
      this.board[i] = [...this.board[i], newCardOnTop];
      this.board[i][this.board[i].length - 2].setNeighbour(newCardOnTop);
      this.checkChainAndFinishCondition(i);
    }
    this.additionsLeft.pop();
  }

  countScore() {
    this.yourScore =
      Math.pow(100, this.gameLevel) * 10 -
      (this.moves - 100) * Math.pow(10, this.gameLevel) -
      (60 * this.minutes + this.seconds) * Math.pow(2, this.gameLevel);
    if (this.yourScore > 999999) {
      this.yourScore = 999999;
    }
    this.scoreService.updateScores({
      score: this.yourScore,
      game: 'solitaire',
    });
  }

  private checkChainAndFinishCondition(columnId: number) {
    let indexToCutOffCompletedChain = this.checkChainCompletion(
      this.board[columnId]
    );
    if (indexToCutOffCompletedChain) {
      let color =
        this.board[columnId][indexToCutOffCompletedChain].CardData.color;
      this.board[columnId].splice(indexToCutOffCompletedChain);
      this.board[columnId][this.board[columnId].length - 1].reveal();
      this.completedChains.push(color);
      if (this.completedChains.length == 8) {
        this.play = false;
        this.isSuccess = 1;
        this.stopTimer();
        this.countScore();
      }
    }
  }

  private checkChainCompletion(column: Card[]): number {
    let len = column.length;
    if (len < 13) {
      return null;
    }
    for (let i = 0; i < len; i++) {
      if (
        column[i].CardData.value == 0 &&
        column[i].canChainBeMoved() &&
        len - i == 13
      ) {
        return i;
      }
    }
    return null;
  }
}
