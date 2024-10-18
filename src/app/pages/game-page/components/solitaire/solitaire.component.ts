import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { Card } from '@pages/game-page/components/solitaire/card';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';
import { GetTemporaryStatePipe } from '@shared/pipes/getTemporaryState.pipe';
import { IsCardRevealedPipe } from '@shared/pipes/is-card-revealed.pipe';
import { SolitaireCardValuePipe } from '@shared/pipes/solitaire-card-value.pipe';

@Component({
  selector: 'pw-solitaire',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    MatButtonModule,
    SolitaireCardValuePipe,
    IsCardRevealedPipe,
    GetTemporaryStatePipe,
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
  first: Card;
  board: Card[][];

  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService
  ) {}

  initBoard() {
    let cardsOrder = new Set<number>();
    while (cardsOrder.size < 104) {
      cardsOrder.add(Math.floor(Math.random() * 104) + 1);
    }
    const cards = Array.from(cardsOrder);
    const board = Array.from({ length: 11 }, () => []);
    let cardIndex = 0;
    for (let i = 0; i < 4; i++) {
      let partOfCards = cards.slice(cardIndex, cardIndex + 6);
      for (let j = 6; j > 0; j--) {
        // Dodawanie jest tak zrobione z powodu konieczności odwrócenia tablicy na końcu operacji. Indeksy muszą być dodane od razu poprawnie.
        board[i].push(
          new Card(
            partOfCards[6 - j] % 13,
            1,
            j < 6 ? board[i][6 - j - 1] : null,
            i,
            j,
            j == 6 ? true : false
          )
        );
      }
      board[i].push(new Card(-1, -1, board[i][5], i, 0, true));
      board[i] = board[i].reverse();
      cardIndex += 6;
    }
    for (let i = 4; i < 10; i++) {
      let partOfCards = cards.slice(cardIndex, cardIndex + 5);
      for (let j = 5; j > 0; j--) {
        board[i].push(
          new Card(
            partOfCards[5 - j] % 13,
            1,
            j < 5 ? board[i][5 - j - 1] : null,
            i,
            j,
            j == 5 ? true : false
          )
        );
      }
      board[i].push(new Card(-1, -1, board[i][4], i, 0, true));
      board[i] = board[i].reverse(); //TODO odwracanie sprawia problemy z indeksami potem przy usuwaniu
      cardIndex += 5;
    }
    board[10] = cards.slice(cardIndex); //TODO zrobić jakoś, żeby to też były karty;
    this.board = board;
    console.log(this.board);
  }

  start(level?: number) {
    this.play = true;
    this.isSuccess = 0;
    this.moves = 0;
    this.resetTimer();
    this.initBoard();
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
      this.first.setTemporaryState('active');
      return;
    } else {
      let second = this.board[colIndex][cardIndex];
      if (!second.isOnTop()) {
        second.setTemporaryState('error');
        this.first.setTemporaryState('error');
        this.first = null;
        return;
      }
      if (this.first.canBePlacedAt(second)) {
        this.move(this.first, second);
        this.first = null;
        return;
      } else {
        second.setTemporaryState('error');
        this.first.setTemporaryState('error');
        this.first = null;
        return;
      }
    }
  }

  move(firstCard: Card, secondCard: Card) {
    let firstCardData = firstCard.getCardData();
    let secondCardData = secondCard.getCardData();
    let movedPart = this.board[firstCardData.columnId].splice(firstCardData.id);
    this.board[secondCardData.columnId] = [
      ...this.board[secondCardData.columnId],
      ...movedPart,
    ];
    this.board[firstCardData.columnId][firstCardData.id - 1].reveal();
    firstCard.putOn(secondCard);
    this.cdr.detectChanges();
  }
}
