import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/errors/error/error.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { breadcrumb: 'tableau.de.bord', skipLocationChange: true },

        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'vos-informations',
        loadChildren: () =>
          import('./pages/vos-informations/vos-informations.module').then(
            (m) => m.VosInformationsModule
          ),
        data: { breadcrumb: 'vos.informations', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'situation-financiere',
        loadChildren: () =>
          import(
            './pages/situation-financiere/situation-financiere.module'
          ).then((m) => m.SituationFinanciereModule),
        data: {
          breadcrumb: 'situation.financière',
          preload: true,
          delay: 10000,
        },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'vie-scolaire',
        loadChildren: () =>
          import('./pages/vie-scolaire/vie-scolaire.module').then(
            (m) => m.VieScolaireModule
          ),
        data: { breadcrumb: 'vie.scolaire', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'releves-notes',
        loadChildren: () =>
          import('./pages/notes-moyennes/notes-moyennes.module').then(
            (m) => m.NotesMoyennesModule
          ),
        data: { breadcrumb: 'notes.moyennes', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'emploi-du-temps',
        loadChildren: () =>
          import('./pages/emploi-du-temps/emploi-du-temps.module').then(
            (m) => m.EmploiDuTempsModule
          ),
        data: { breadcrumb: 'emploi.du.temps', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'vos-documents',
        loadChildren: () =>
          import('./pages/manuels-documents/manuels-documents.module').then(
            (m) => m.ManuelsDocumentsModule
          ),
        data: { breadcrumb: 'manuels.documents', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
        path: 'messagerie',
        loadChildren: () =>
          import('./pages/messagerie/messagerie.module').then(
            (m) => m.MessagerieModule
          ),
        data: { breadcrumb: 'messagerie', preload: true, delay: 10000 },
        // canActivate: [LoggedInGuard],
        // canActivateChild: [LoggedInChildGuard],
      },
      {
    path: 'reinitialisationPassword',
    loadChildren: () =>
      import('./pages/reinitialisation-password/reinitialisation-password.module').then(
        (m) => m.ReinitialisationPasswordModule
      ),
      data: { breadcrumb: 'reinitialisation', preload: true, deplay: 10000 },
    },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'newPassword',
    loadChildren: () =>
      import('./pages/new-password/new-password.module').then(
        (m) => m.NewPasswordModule
      ),
  },
  { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
