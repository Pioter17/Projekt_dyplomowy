import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Score } from '@pages/game-page/interfaces/scores.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  constructor(private apiService: ApiService) {}

  private scores = new BehaviorSubject<Score[]>([]);

  getScores() {
    return this.scores.asObservable();
  }

  setInitialScores(gameName: string) {
    this.apiService.getScores(gameName).subscribe((scores) => {
      this.scores.next(scores);
    });
  }

  updateScores(newScore: Score) {
    this.scores.next([...this.scores.getValue(), newScore]);
  }
}
