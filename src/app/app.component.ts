import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Settings } from './app.settings.model';
import { AppSettings } from './app.settings';
import { LocalStorageService } from './@common/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Keepalive } from '@ng-idle/keepalive';

import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { LoginService } from './@common/services/login.service';
import { projectOption } from 'src/environments/project-option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  public settings: Settings;
  title = 'Gtp';
  lang = 'fr';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  loading = true;
  constructor(
    private cd: ChangeDetectorRef,
    public appSettings: AppSettings,
    private localStorageService: LocalStorageService,
    protected translate: TranslateService,
    private idle: Idle,
    private keepalive: Keepalive,
    private loginService: LoginService
  ) {
    this.setTimeOut();

    this.settings = this.appSettings.settings;
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }

  setTimeOut() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(5);
    // sets a timeout period of 900 seconds (15 minutes). after 900 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(900);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.loginService.logout();
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      // console.log(this.idleState);
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState =
        'You will time out in ' +
        countdown +
        ' seconds!'; /*console.log(this.idleState) */
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  ngOnInit() {
    if (this.localStorageService.getInLocalStorage(projectOption.userKey)) {
      let account = JSON.parse(
        this.localStorageService.getInLocalStorage(projectOption.userKey)
      );
      this.loginService.updatedAccount(account);
    }
  }
  ngAfterViewInit(): void {
    this.loading = false;
    this.cd.detectChanges();
  }
}
