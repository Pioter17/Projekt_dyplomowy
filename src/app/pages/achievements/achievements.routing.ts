import { Routes } from '@angular/router';
import { AchievementsComponent } from '@pages/achievements/achievements.component';

export default [
  {
    path: '',
    component: AchievementsComponent,
    pathMatch: 'full',
  },
] as Routes;
