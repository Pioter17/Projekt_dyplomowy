import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  constructor() { }

  private scores = new BehaviorSubject<number[]>([]);

  getScores() {
    return this.scores.asObservable();
  }

  setInitialScores(initialScores: number[]) {
    this.scores.next(initialScores);
  }

  updateScores(newScore: number) {
    this.scores.next([...this.scores.getValue(), newScore]);
  }
}
