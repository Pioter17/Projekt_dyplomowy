import { Inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { AuthService } from '@core/services/auth.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    @Inject(AuthService) private authService: AuthService
  ) {
    this.authService.checkStatus().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.myAchievements.next([]);
      }
    });
  }
  private myAchievements = new BehaviorSubject<number[]>([]);

  getMyAchievements() {
    return this.myAchievements.asObservable();
  }

  fetchMyAchievements() {
    this.apiService.getAchievements().subscribe((achievements) => {
      this.myAchievements.next(achievements);
    });
  }

  unlockAchievement(achievementId: number) {
    this.apiService
      .unlockAchievement(achievementId)
      .subscribe((unlockedAchievement) => {
        this.myAchievements.next([
          ...this.myAchievements.getValue(),
          unlockedAchievement,
        ]);
      });
  }
}
