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

    return localStorage.getItem('localeId') ||
      this.locales.find((locale) => navigator.language.startsWith(locale)) ||
      this.locales[0];
  }
}
