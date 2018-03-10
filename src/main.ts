import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LocaleService } from './app/locale.service';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
// const translations = require(`raw-loader!./locale/messages.en.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: LocaleService.getLocale()
    },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {

        if (locale == 'ru') { // no need translations
          return;
        }

        return require(`raw-loader!./locale/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
  ]
});
