import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import appRouting from '@app/app.routing';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(appRouting),
      HttpClientModule,
    ),
    provideHttpClient(),
    provideAnimations(),
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: MatFormFieldDefaultOptionsConfig,
    // },
  ],
}
