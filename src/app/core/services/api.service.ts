import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants/api.const';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@core/interfaces/api.interface';
import { Environment } from '@env/environment.const';
import { Score } from '@pages/game-page/interfaces/scores.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getScores(game: string): Observable<Score[]> {
    return this.http
      .get<ApiResponse>(Environment.HttpBackend + ApiRoutes.BEST + game)
      .pipe(
        map((res: ApiResponse) => {
          if (res.isSuccess) {
            console.log(res);
            return res.data as Score[];
          } else {
            throw new Error(res.message);
          }
        })
      );
  }
}
