import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
  public settings = new Settings(
    'GTP', //theme name
    true, //loadingSpinner
    true, //fixedHeader
    true, //sidenavIsOpened
    true, //sidenavIsPinned
    true, //sidenavUserBlock
    'vertical',
    // 'vertical', //horizontal , vertical
    'default', //default, compact, mini
    'indigo-light',
    //'teal-light', // "gtp-color", //indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark, gtp-color
    false, // true = rtl, false = ltr
    false, // true = has footer, false = no footer
    20 //nom de ligne par page
  );
}
