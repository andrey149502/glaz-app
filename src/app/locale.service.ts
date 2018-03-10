import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

  constructor() { }

  static changeLocale(locale: string) {
    localStorage.setItem('localeId', locale);
    location.reload();
  }
  static locales = ['en', 'ru'];
  static getLocale() {
    const browserLocale = navigator.language.split('-')[0];

    return localStorage.getItem('localeId') || (this.locales.includes(browserLocale) ? browserLocale : 'en');
  }
}
