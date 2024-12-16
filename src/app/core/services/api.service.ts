import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants/api.const';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@core/interfaces/api.interface';
import { Environment } from '@env/environment.const';
import { Score, ScoreDTO } from '@pages/game-page/interfaces/scores.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getScores(game: string): Observable<Score[]> {
    return this.http
      .get<ApiResponse<Score[]>>(
        `${Environment.HttpBackend}${ApiRoutes.BEST}${game}`
      )
      .pipe(
        map((res: ApiResponse<Score[]>) => {
          if (res.isSuccess) {
            return res.data;
          } else {
            throw new Error(res.message);
          }
        })
      );
  }

  postScore(score: ScoreDTO): Observable<Score> {
    return this.http
      .post<ApiResponse<Score>>(
        `${Environment.HttpBackend}${ApiRoutes.SCORES}${ApiRoutes.ADD}`,
        score
      )
      .pipe(
        map((res: ApiResponse<Score>) => {
          if (res.isSuccess) {
            return res.data;
          } else {
            return null;
            // throw new Error(res.message);
          }
        })
      );
  }

  getPersonalScores(game: string): Observable<Score[]> {
    return this.http
      .get<ApiResponse<Score[]>>(
        `${Environment.HttpBackend}${ApiRoutes.PERSONAL}${game}`
      )
      .pipe(
        map((res: ApiResponse<Score[]>) => {
          if (res.isSuccess) {
            return res.data;
          } else {
            throw new Error(res.message);
          }
        })
      );
  }
}
