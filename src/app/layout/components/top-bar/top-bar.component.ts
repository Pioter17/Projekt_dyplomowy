import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { AuthService } from '@core/services/auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'pw-top-bar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit, OnDestroy {
  isHidden = true;
  isAchievementsPage = false;
  isLoginPage = false;
  isLoggedIn$: Observable<boolean>;
  onDestroy$ = new Subject<void>();

  constructor(
    private transloco: TranslocoService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.router.url != '/home') {
      this.isHidden = false;
    }
    this.isLoggedIn$ = this.authService.checkStatus().pipe(
      takeUntil(this.onDestroy$),
      tap(() => {
        this.cdr.detectChanges();
      })
    );
    this.router.events
      .pipe(
        map((event) => {
          if (event instanceof NavigationEnd) {
            if (this.router.url == '/home') {
              this.isHidden = true;
            } else {
              this.isHidden = false;
            }
            if (this.router.url == '/achievements') {
              this.isAchievementsPage = true;
            } else {
              this.isAchievementsPage = false;
            }
            if (this.router.url == '/auth/login') {
              this.isLoginPage = true;
            } else {
              this.isLoginPage = false;
            }
            this.cdr.detectChanges();
          } else {
            if (this.router.url == '/auth/login') {
              this.isLoginPage = true;
            } else {
              this.isLoginPage = false;
            }
            this.cdr.detectChanges();
          }
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get classes() {
    return {
      hidden: this.isHidden,
    };
  }

  goBack() {
    this.router.navigateByUrl(RoutesPath.HOME);
  }

  changeLanguage() {
    this.transloco.setActiveLang(
      this.transloco.getActiveLang() == 'en' ? 'pl' : 'en'
    );
  }

  goToAchievements() {}

  manageAccount() {
    this.isLoggedIn$.subscribe((status) => {
      if (!status) {
        void this.router.navigate([`/${RoutesPath.AUTH}/${RoutesPath.LOGIN}`]);
      } else {
        this.authService.logout();
      }
    });
  }
}
