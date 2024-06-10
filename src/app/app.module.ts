import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { registerLocaleData } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeFr from '@angular/common/locales/fr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true,
};
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { LOCALE_ID, NgModule } from '@angular/core';

// import { JwtInterceptorService } from "./@common/interceptor/jwt-interceptor.service";
import { AppSettings } from './app.settings';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { CommentDialogComponent } from './theme/components/comment-dialog/comment-dialog.component';
import { ConfirmDialogWithYesComponent } from './theme/components/confirm-dialog-with-yes/confirm-dialog-with-yes.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { SnackbarComponent } from './theme/components/snackbar/snackbar.component';
import { TypeToConfirmDialogComponent } from './theme/components/type-to-confirm-dialog/type-to-confirm-dialog.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import * as date_fns_2 from 'date-fns';
import * as tslib_1 from 'tslib';
import Counter from './@common/services/counter';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';


function adapterFactory() {
  return tslib_1.__assign(tslib_1.__assign({}), date_fns_2);
}

registerLocaleData(localeFr, 'fr-FR');
// en dev
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
// En prod quand on a un base-href (ici la base-href est gtp)
// export function setTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, "../gtp/assets/i18n/", ".json"); //gtp c'est pour le context qu'on met lors du build en prod
// }

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient],
      },
    }),
    QuillModule.forRoot({
      customModules: [
        {
          implementation: Counter,
          path: 'modules/counter',
        },
      ],
      customOptions: [
        {
          import: 'formats/font',
          whitelist: [
            'mirza',
            'roboto',
            'aref',
            'serif',
            'sansserif',
            'monospace',
          ],
        },
      ],
    }),
    SharedModule,
    PipesModule,
    NgIdleKeepaliveModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    ErrorComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FullScreenComponent,
    MessagesComponent,
    UserMenuComponent,
    SidenavComponent,
    SnackbarComponent,
    ConfirmDialogWithYesComponent,
    CommentDialogComponent,
    TypeToConfirmDialogComponent,
  ],
  providers: [
    AppSettings,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService,
    //   multi: true,
    // },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
