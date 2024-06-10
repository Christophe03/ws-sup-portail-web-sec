import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe } from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/MailSearchPipe';
import { PosteSearchPipe } from './search/poste-search.pipe';
import { EmployeSearchPipe } from './search/employe-search.pipe';
import { StatutCongePipe } from './statuts/statut-conge.pipe';
import { DomaineMailPipe } from './statuts/domaine-mail.pipe';
import { EtatActivitePipe } from './statuts/etatActivite.pipe';
import { MissionPipe } from './statuts/mission.pipe';
import { AgentRolePipe } from './statuts/agentRole.pipe';
import { SeparateurMilliersPipe } from './separateur/SeparateurMilliers.pipe';
import { TitleCasePipePerso } from './title-capitalize/title-capitalize.pipe';
import { OrdreMissionPipe } from './statuts/ordre-mission.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SeparateurMilliersPipe,
    PaginationPipe,
    ProfilePicturePipe,
    ChatPersonSearchPipe,
    UserSearchPipe,
    EmployeSearchPipe,
    PosteSearchPipe,
    TruncatePipe,
    MailSearchPipe,
    StatutCongePipe,
    EtatActivitePipe,
    DomaineMailPipe,
    MissionPipe,
    AgentRolePipe,
    TitleCasePipePerso,
    OrdreMissionPipe,
  ],
  exports: [
    SeparateurMilliersPipe,
    PaginationPipe,
    ProfilePicturePipe,
    ChatPersonSearchPipe,
    UserSearchPipe,
    EmployeSearchPipe,
    PosteSearchPipe,
    TruncatePipe,
    MailSearchPipe,
    EtatActivitePipe,
    StatutCongePipe,
    DomaineMailPipe,
    MissionPipe,
    AgentRolePipe,
    TitleCasePipePerso,
    OrdreMissionPipe,
  ],
})
export class PipesModule {}
