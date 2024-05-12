import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinesweeperComponent } from '@pages/game-page/components/minesweeper/minesweeper.component';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'pw-game-page',
  standalone: true,
  imports: [
    CommonModule,
    MinesweeperComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit, OnDestroy { 

  gameName: string;
  onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => params['name'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe(
      (name) => {
        this.gameName = name;
      }
    )
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  receiveDataFromChild(data: number) {
    console.log(data);
  }
}
