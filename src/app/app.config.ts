import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import appRouting from '@app/app.routing';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(appRouting),
      HttpClientModule,
    ),
    provideHttpClient(),
    provideAnimations(), provideHttpClient(), provideTransloco({
        config: {
          availableLangs: ['en', 'pl'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: MatFormFieldDefaultOptionsConfig,
    // },
  ],
}
