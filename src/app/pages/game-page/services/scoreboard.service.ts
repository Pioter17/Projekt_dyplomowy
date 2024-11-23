import { Inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { AuthService } from '@core/services/auth.service';
import { Score } from '@pages/game-page/interfaces/scores.interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  constructor(
    private apiService: ApiService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.authService.checkStatus().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.myScores.next([]);
      }
    });
  }

  private scores = new BehaviorSubject<Score[]>([]);
  private myScores = new BehaviorSubject<number[]>([]);

  getScores() {
    return this.scores.asObservable();
  }

  getMyScores() {
    return this.myScores.asObservable();
  }

  fetchScores(gameName: string) {
    this.apiService.getScores(gameName).subscribe((scores) => {
      this.scores.next(scores);
    });
  }

  fetchMyScores(gameName: string) {
    this.apiService
      .getPersonalScores(gameName)
      .pipe(map((scores) => scores.map((score) => score.score)))
      .subscribe((scores) => {
        this.myScores.next(scores);
      });
  }

  updateScores(newScore: Score) {
    this.scores.next([...this.scores.getValue(), newScore]);
  }
}
