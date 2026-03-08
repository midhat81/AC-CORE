import { ApplicationConfig, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    
    // This line tells Angular to load the internal services required by the library
    importProvidersFrom(SocialLoginModule), 
    
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('184337788465-d57oaputgh4s9vvc384sbe6olrvc8ffd.apps.googleusercontent.com')
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};