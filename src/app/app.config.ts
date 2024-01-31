import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// To address NG02801 warning and add `withFetch()` to the `provideHttpClient()` call
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// added the provideHttpClient(withFetch()) provider
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch())]
};
