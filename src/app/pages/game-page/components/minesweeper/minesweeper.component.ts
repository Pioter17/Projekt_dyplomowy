import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Cords } from '@pages/game-page/interfaces/minesweeper.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScoreboardService } from '@pages/game-page/scoreboard.service';

@Component({
  selector: 'pw-minesweeper',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinesweeperComponent {

  constructor(
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreboardService,
  ) { }

  play: boolean;
  isSuccess: number;
  range: number; // The number of all fields
  rows: number;
  columns: number;
  gameLevel: number;
  hiddenLeft: number; // the number of fields that are yet hidden
  hiddenFields: number[][]; // -1 - flag, 0 - revealed, 1 - hidden
  bombs: number; // the number of bombs that are on the board
  fields: number[][]; // array with the number of every field: -1 - bomb, 0-8 - how many bombs surrounding,
  flags: number; // the number of flags that user put
  minutes: number = 0;
  seconds: number = 0;
  isRunning: boolean = false;
  interval: any;
  youScore: number;
  @Output() score = new EventEmitter<number>();

  start(level?: number) {
    this.play = true;
    this.isSuccess = 0;
    this.flags = 0;
    this.loadBoard(level);
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

  loadBoard(level?: number) {
    if (level) {
      this.gameLevel = level;
    }
    let bombsPercent;

    switch (this.gameLevel) {
      case 1:
        this.range = 100;
        this.rows = 10;
        this.columns = 10;
        bombsPercent = 10;
        break
      case 2:
        this.range = 200;
        this.rows = 10;
        this.columns = 20;
        bombsPercent = 14;
        break
      case 3:
        this.range = 400;
        this.rows = 16;
        this.columns = 25;
        bombsPercent = 17;
    }

    this.fields = Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => 0));
    this.hiddenFields = Array.from({ length: this.rows }, () => Array.from({ length: this.columns }, () => 1));
    this.bombs = Math.floor(this.range * (bombsPercent / 100));
    this.hiddenLeft = this.range - this.bombs;

    this.fields = this.drawBombs(this.fields, this.bombs);
  }

  drawBombs(array: number[][], bombs: number) {
    const rows = array.length;
    const cols = array[0].length;

    let j = 0;
    while (j < bombs) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        if (array[randomRow][randomCol] !== -1) {
            array[randomRow][randomCol] = -1;
            j++;
        }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (array[row][col] === -1) continue;

        let bombyNeighbours = 0;
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && array[r][c] === -1) {
              bombyNeighbours++;
            }
          }
        }
        array[row][col] = bombyNeighbours;
      }
    }

    return array;
  }

  setFlag(rowId: number, colId: number, event: MouseEvent) {
    event.preventDefault();

    if (!this.play) {
      return;
    }

    if (this.hiddenFields[rowId][colId] == -1)
    {
      this.hiddenFields[rowId][colId] = 1;
      this.flags--;
    }
    else if (this.hiddenFields[rowId][colId] == 1)
    {
      this.hiddenFields[rowId][colId] = -1;
      this.flags++;
    }
  }

  showBombs() {
    this.fields.forEach((row, rowId) => {
      row.forEach((field, colId) => {
        if (field == -1) {
          this.hiddenFields[rowId][colId] = 0;
        }
      })
    })
  }

  revealField(rowId: number, colId: number) {
    if (!this.play || this.hiddenFields[rowId][colId] == -1) {
      return;
    }
    if (this.fields[rowId][colId] == -1) {
      this.play = false;
      this.isSuccess = -1;
      this.showBombs();
      this.stopTimer();
      return;
    }

    if (this.hiddenFields[rowId][colId] != 1) {
      return;
    }

    if (this.fields[rowId][colId] != 0) {
      this.hiddenFields[rowId][colId] = 0;
      this.hiddenLeft--;
    } else {
      this.getNeighbours(rowId, colId);
    }

    if (this.hiddenLeft == 0) {
      this.play = false;
      this.isSuccess = 1;
      this.stopTimer();
      this.countScore();
    }
  }

  getNeighbours(rowId: number, colId: number): Cords[] {
    const neighbours: Cords[] = [];
    const rows = this.rows;
    const cols = this.columns;

    if (this.fields[rowId][colId] != 0) {
      return [];
    }

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const newRow = rowId + rowOffset;
        const newCol = colId + colOffset;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && this.hiddenFields[newRow][newCol] == 1) {
          this.hiddenFields[newRow][newCol] = 0;
          this.hiddenLeft--;
          neighbours.push({rowId: newRow, colId: newCol});
        }
      }
    }

    let newNeighbours: Cords[] = [];

    neighbours.forEach((cord: Cords) => {
      newNeighbours = this.getNeighbours(cord.rowId, cord.colId);
    });

    newNeighbours.forEach((cord: Cords) => {
      if (!neighbours.includes({rowId: cord.rowId, colId: cord.colId})) {
        neighbours.push({rowId: cord.rowId, colId: cord.colId});
      }
    })

    return neighbours;
  }

  countScore() {
    this.youScore = Math.pow(10, this.gameLevel+3)-Math.floor(this.minutes*6*Math.pow(10, this.gameLevel+1)/(this.gameLevel+3))-Math.floor(this.seconds*Math.pow(10, this.gameLevel+1)/(this.gameLevel+3))
    this.scoreService.updateScores(this.youScore);
  }
}
