import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { AchievementDisplay } from '@pages/achievements/interfaces/achievements.interface';
import { AchievementsService } from '@pages/achievements/services/achievements.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'pw-achievements',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  unlockedAchievements$: Observable<AchievementDisplay[]>;
  achievementsToUnlock$: Observable<AchievementDisplay[]>;

  constructor(private achievementService: AchievementsService) {}

  ngOnInit(): void {
    this.achievementService.fetchMyAchievements();
    this.unlockedAchievements$ = this.achievementService
      .getMyAchievements()
      .pipe(
        tap((achievements) => {
          console.log(achievements);
        }),
        map((achievements) => {
          return achievements.map((achievement: number) => {
            return {
              id: achievement.toString(),
              title: this.mapAchievementTitle(achievement),
            };
          });
        })
      );

    this.achievementsToUnlock$ = this.unlockedAchievements$.pipe(
      map((unlockedAchievements) => {
        const unlockedIds = unlockedAchievements.map((a) => parseInt(a.id, 10));
        return Array.from({ length: 40 }, (_, i) => i + 1) // Tworzenie tablicy liczb od 1 do 40
          .filter((id) => !unlockedIds.includes(id)) // Filtruj osiągnięcia, które nie są odblokowane
          .map((achievement) => ({
            id: achievement.toString(),
            title: this.mapAchievementTitle(achievement),
          }));
      })
    );
  }

  private mapAchievementTitle(achievement: number): string {
    let id = achievement;
    if (id % 6 < 3) {
      return '0';
    } else {
      for (let i = 1; i <= 6; i++) {
        if (id <= i * 6) {
          return i.toString();
        }
      }
      return '7';
    }
  }
}
