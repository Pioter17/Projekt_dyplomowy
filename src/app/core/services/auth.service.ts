import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants/api.const';
import {
  ApiResponse,
  AuthenticationResponse,
} from '@core/interfaces/api.interface';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Environment } from '@env/environment.const';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  checkStatus() {
    return this.isLoggedIn.asObservable();
  }

  login(name: string, password: string): Observable<ApiResponse<string>> {
    return this.http
      .post<AuthenticationResponse>(
        `${Environment.HttpBackend}${ApiRoutes.AUTH}${ApiRoutes.LOGIN}`,
        { name, password }
      )
      .pipe(
        catchError(() => of({ token: '' })),
        map((res: AuthenticationResponse) => {
          if (res.token) {
            this.isLoggedIn.next(true);
            this.localStorageService.setItem('token', res.token);
            this.localStorageService.setItem('name', name);
            this.localStorageService.setItem('status', 'logged');
            return { data: res.token, message: 'success', isSuccess: true };
          }
          return { data: '', message: 'error', isSuccess: false };
        })
      );
  }

  register(name: string, password: string): Observable<ApiResponse<string>> {
    return this.http
      .post<AuthenticationResponse>(
        `${Environment.HttpBackend}${ApiRoutes.AUTH}${ApiRoutes.REGISTER}`,
        { name, password }
      )
      .pipe(
        catchError(() => of({ token: '' })),
        map((res: AuthenticationResponse) => {
          if (res.token) {
            this.isLoggedIn.next(true);
            this.localStorageService.setItem('token', res.token);
            this.localStorageService.setItem('name', name);
            this.localStorageService.setItem('status', 'logged');
            return { data: res.token, message: 'success', isSuccess: true };
          }
          return { data: '', message: 'error', isSuccess: false };
        })
      );
  }

  logout() {
    this.localStorageService.setItem('token', '');
    this.localStorageService.setItem('name', '');
    this.localStorageService.setItem('token', '');
    this.isLoggedIn.next(false);
  }
}
